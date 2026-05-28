/**
 * Cookie consent utility functions for use in other controllers
 */

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

const anonymizeIp = (ip) => {
  if (!ip) return null;
  const parts = ip.split(".");
  if (parts.length === 4) {
    return `${parts[0]}.${parts[1]}.${parts[2]}.0`;
  }
  return null;
};

/**
 * Check if a request has consent for a specific type
 */
const hasConsent = async (req, consentType, prisma) => {
  try {
    const ip = getClientIp(req);
    const userAgent = req.headers["user-agent"] || "";
    const clientId = hashClientId(ip, userAgent);

    const consent = await prisma.cookieConsent.findUnique({
      where: { clientId },
    });

    if (!consent) return false;

    // Check if expired
    if (new Date() > new Date(consent.expiresAt)) {
      await prisma.cookieConsent.delete({ where: { clientId } });
      return false;
    }

    return consent[consentType] ?? false;
  } catch (error) {
    console.error("Error checking consent:", error);
    return false;
  }
};

/**
 * Log a user action (with consent check)
 */
const logUserAction = async (
  req,
  action,
  metadata,
  prisma,
  requireConsent = "analytics"
) => {
  try {
    // Check if user has required consent
    if (requireConsent) {
      const consented = await hasConsent(req, requireConsent, prisma);
      if (!consented) {
        return false;
      }
    }

    // Log action to your analytics table
    // This is a placeholder - implement based on your needs
    console.log(`User action: ${action}`, metadata);
    return true;
  } catch (error) {
    console.error("Error logging user action:", error);
    return false;
  }
};

module.exports = {
  hashClientId,
  getClientIp,
  anonymizeIp,
  hasConsent,
  logUserAction,
};
