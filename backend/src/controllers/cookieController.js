const crypto = require("crypto");
const prisma = require("../models/prismaClient");

// Helper to hash client identifier (IP + User Agent)
const hashClientId = (ip, userAgent) => {
  return crypto
    .createHash("sha256")
    .update(`${ip}:${userAgent}`)
    .digest("hex")
    .substring(0, 32);
};

// Helper to anonymize IP (remove last octet)
const anonymizeIp = (ip) => {
  if (!ip) return null;
  const parts = ip.split(".");
  if (parts.length === 4) {
    return `${parts[0]}.${parts[1]}.${parts[2]}.0`;
  }
  return null;
};

// Get client's real IP (considering proxies)
const getClientIp = (req) => {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
    req.headers["x-real-ip"] ||
    req.socket.remoteAddress
  );
};

/**
 * Record cookie consent
 * POST /api/cookies/consent
 */
exports.recordConsent = async (req, res) => {
  try {
    const { essential, analytics, marketing } = req.body;
    const ip = getClientIp(req);
    const userAgent = req.headers["user-agent"] || "";
    const clientId = hashClientId(ip, userAgent);
    const anonymizedIp = anonymizeIp(ip);

    // Calculate expiration (1 year from now)
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);

    // Update or create consent record
    const consent = await prisma.cookieConsent.upsert({
      where: { clientId },
      update: {
        essential: essential ?? true,
        analytics: analytics ?? false,
        marketing: marketing ?? false,
        updatedAt: new Date(),
        expiresAt,
      },
      create: {
        clientId,
        essential: essential ?? true,
        analytics: analytics ?? false,
        marketing: marketing ?? false,
        ipAddress: anonymizedIp,
        userAgent,
        expiresAt,
      },
    });

    // Record in history
    await prisma.cookieConsentHistory.create({
      data: {
        clientId,
        essential: essential ?? true,
        analytics: analytics ?? false,
        marketing: marketing ?? false,
        action: "accepted",
        ipAddress: anonymizedIp,
        userAgent,
      },
    });

    return res.json({
      success: true,
      message: "Cookie consent recorded",
      data: consent,
    });
  } catch (error) {
    console.error("Error recording consent:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to record cookie consent",
    });
  }
};

/**
 * Get user's cookie consent
 * GET /api/cookies/consent
 */
exports.getConsent = async (req, res) => {
  try {
    const ip = getClientIp(req);
    const userAgent = req.headers["user-agent"] || "";
    const clientId = hashClientId(ip, userAgent);

    const consent = await prisma.cookieConsent.findUnique({
      where: { clientId },
    });

    if (!consent) {
      return res.json({
        success: true,
        data: null,
        message: "No consent record found",
      });
    }

    // Check if expired
    if (new Date() > new Date(consent.expiresAt)) {
      await prisma.cookieConsent.delete({ where: { clientId } });
      return res.json({
        success: true,
        data: null,
        message: "Consent expired",
      });
    }

    return res.json({
      success: true,
      data: {
        essential: consent.essential,
        analytics: consent.analytics,
        marketing: consent.marketing,
        recordedAt: consent.createdAt,
      },
    });
  } catch (error) {
    console.error("Error fetching consent:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch cookie consent",
    });
  }
};

/**
 * Update cookie consent
 * PATCH /api/cookies/consent
 */
exports.updateConsent = async (req, res) => {
  try {
    const { essential, analytics, marketing } = req.body;
    const ip = getClientIp(req);
    const userAgent = req.headers["user-agent"] || "";
    const clientId = hashClientId(ip, userAgent);
    const anonymizedIp = anonymizeIp(ip);

    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);

    const consent = await prisma.cookieConsent.update({
      where: { clientId },
      data: {
        essential: essential ?? true,
        analytics: analytics ?? false,
        marketing: marketing ?? false,
        expiresAt,
      },
    });

    // Record in history
    await prisma.cookieConsentHistory.create({
      data: {
        clientId,
        essential,
        analytics,
        marketing,
        action: "updated",
        ipAddress: anonymizedIp,
        userAgent,
      },
    });

    return res.json({
      success: true,
      message: "Cookie consent updated",
      data: consent,
    });
  } catch (error) {
    console.error("Error updating consent:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update cookie consent",
    });
  }
};

/**
 * Withdraw cookie consent (delete record)
 * DELETE /api/cookies/consent
 */
exports.withdrawConsent = async (req, res) => {
  try {
    const ip = getClientIp(req);
    const userAgent = req.headers["user-agent"] || "";
    const clientId = hashClientId(ip, userAgent);
    const anonymizedIp = anonymizeIp(ip);

    // Record withdrawal in history
    await prisma.cookieConsentHistory.create({
      data: {
        clientId,
        action: "withdrawn",
        ipAddress: anonymizedIp,
        userAgent,
      },
    });

    // Delete consent record
    await prisma.cookieConsent.deleteMany({
      where: { clientId },
    });

    return res.json({
      success: true,
      message: "Cookie consent withdrawn",
    });
  } catch (error) {
    console.error("Error withdrawing consent:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to withdraw cookie consent",
    });
  }
};

/**
 * Get consent statistics (admin endpoint)
 * GET /api/cookies/stats
 */
exports.getConsentStats = async (req, res) => {
  try {
    // Check for admin token
    const token = req.headers.authorization?.split(" ")[1];
    if (token !== process.env.ADMIN_TOKEN) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const total = await prisma.cookieConsent.count();
    const analyticsAllowed = await prisma.cookieConsent.count({
      where: { analytics: true },
    });
    const marketingAllowed = await prisma.cookieConsent.count({
      where: { marketing: true },
    });

    const lastFewDays = new Date();
    lastFewDays.setDate(lastFewDays.getDate() - 7);

    const recentConsents = await prisma.cookieConsent.count({
      where: {
        createdAt: { gte: lastFewDays },
      },
    });

    return res.json({
      success: true,
      data: {
        total,
        analytics: {
          count: analyticsAllowed,
          percentage: total > 0 ? ((analyticsAllowed / total) * 100).toFixed(2) : 0,
        },
        marketing: {
          count: marketingAllowed,
          percentage: total > 0 ? ((marketingAllowed / total) * 100).toFixed(2) : 0,
        },
        recentConsents: {
          last7Days: recentConsents,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch consent statistics",
    });
  }
};

/**
 * Get privacy policy
 * GET /api/privacy-policy
 */
exports.getPrivacyPolicy = async (req, res) => {
  try {
    const { version } = req.query;

    let policy;
    if (version) {
      policy = await prisma.privacyPolicyVersion.findUnique({
        where: { version },
      });
    } else {
      // Get latest published version
      policy = await prisma.privacyPolicyVersion.findFirst({
        where: { published: true },
        orderBy: { createdAt: "desc" },
      });
    }

    if (!policy) {
      return res.status(404).json({
        success: false,
        message: "Privacy policy not found",
      });
    }

    return res.json({
      success: true,
      data: policy,
    });
  } catch (error) {
    console.error("Error fetching privacy policy:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch privacy policy",
    });
  }
};

/**
 * Create/update privacy policy (admin)
 * POST /api/privacy-policy
 */
exports.updatePrivacyPolicy = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token !== process.env.ADMIN_TOKEN) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { version, content, publish } = req.body;

    if (!version || !content) {
      return res.status(400).json({
        success: false,
        message: "Version and content are required",
      });
    }

    // Unpublish previous versions if publishing this one
    if (publish) {
      await prisma.privacyPolicyVersion.updateMany({
        where: { published: true },
        data: { published: false },
      });
    }

    const policy = await prisma.privacyPolicyVersion.upsert({
      where: { version },
      update: {
        content,
        published: publish ?? false,
      },
      create: {
        version,
        content,
        published: publish ?? false,
      },
    });

    return res.json({
      success: true,
      message: "Privacy policy updated",
      data: policy,
    });
  } catch (error) {
    console.error("Error updating privacy policy:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update privacy policy",
    });
  }
};

/**
 * Export user's consent data (GDPR)
 * GET /api/cookies/export
 */
exports.exportConsentData = async (req, res) => {
  try {
    const ip = getClientIp(req);
    const userAgent = req.headers["user-agent"] || "";
    const clientId = hashClientId(ip, userAgent);

    const consent = await prisma.cookieConsent.findUnique({
      where: { clientId },
    });

    const history = await prisma.cookieConsentHistory.findMany({
      where: { clientId },
      orderBy: { createdAt: "desc" },
    });

    return res.json({
      success: true,
      data: {
        consent,
        history,
        exportedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error exporting consent data:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to export consent data",
    });
  }
};

/**
 * Delete user's consent data (GDPR right to be forgotten)
 * DELETE /api/cookies/data
 */
exports.deleteConsentData = async (req, res) => {
  try {
    const ip = getClientIp(req);
    const userAgent = req.headers["user-agent"] || "";
    const clientId = hashClientId(ip, userAgent);

    // Keep history for compliance, but delete consent record
    await prisma.cookieConsent.deleteMany({
      where: { clientId },
    });

    return res.json({
      success: true,
      message: "Consent data deleted",
    });
  } catch (error) {
    console.error("Error deleting consent data:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete consent data",
    });
  }
};
