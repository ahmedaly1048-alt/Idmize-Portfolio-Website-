/**
 * Consent Tracking Middleware
 * Tracks cookie consent events for analytics
 */

const prisma = require("../models/prismaClient");
const crypto = require("crypto");

const hashClientId = (ip, userAgent) => {
  return crypto
    .createHash("sha256")
    .update(`${ip}:${userAgent}`)
    .digest("hex")
    .substring(0, 32);
};

const getClientIp = (req) => {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
    req.headers["x-real-ip"] ||
    req.socket.remoteAddress
  );
};

/**
 * Middleware to add consent info to request
 */
const consentTracking = async (req, res, next) => {
  try {
    const ip = getClientIp(req);
    const userAgent = req.headers["user-agent"] || "";
    const clientId = hashClientId(ip, userAgent);

    // Attach to request for later use
    req.clientId = clientId;
    req.clientIp = ip;
    req.clientUserAgent = userAgent;

    // Optional: Fetch user's consent status
    const consent = await prisma.cookieConsent.findUnique({
      where: { clientId },
    });

    req.userConsent = consent;
    next();
  } catch (error) {
    console.error("Consent tracking error:", error);
    next(); // Continue even if tracking fails
  }
};

/**
 * Middleware to verify admin token
 */
const adminAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  const adminToken = process.env.ADMIN_TOKEN;

  if (!token || token !== adminToken) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized - Invalid admin token",
    });
  }

  next();
};

/**
 * Middleware to require analytics consent for tracking endpoints
 */
const requireAnalyticsConsent = (req, res, next) => {
  if (!req.userConsent?.analytics) {
    return res.status(403).json({
      success: false,
      message: "Analytics consent required for this endpoint",
    });
  }
  next();
};

/**
 * Middleware to require marketing consent
 */
const requireMarketingConsent = (req, res, next) => {
  if (!req.userConsent?.marketing) {
    return res.status(403).json({
      success: false,
      message: "Marketing consent required for this endpoint",
    });
  }
  next();
};

module.exports = {
  consentTracking,
  adminAuth,
  requireAnalyticsConsent,
  requireMarketingConsent,
};
