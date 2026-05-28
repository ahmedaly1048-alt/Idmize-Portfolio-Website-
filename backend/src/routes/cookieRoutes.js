const express = require("express");
const router = express.Router();
const cookieController = require("../controllers/cookieController");

/**
 * Cookie Consent Endpoints
 */

// Record user's cookie consent
router.post("/consent", cookieController.recordConsent);

// Get user's current cookie consent
router.get("/consent", cookieController.getConsent);

// Update user's cookie consent
router.patch("/consent", cookieController.updateConsent);

// Withdraw cookie consent (delete)
router.delete("/consent", cookieController.withdrawConsent);

/**
 * Privacy Policy Endpoints
 */

// Get current privacy policy
router.get("/privacy-policy", cookieController.getPrivacyPolicy);

// Create/update privacy policy (admin only)
router.post("/privacy-policy", cookieController.updatePrivacyPolicy);

/**
 * GDPR Endpoints
 */

// Export user's consent data
router.get("/export", cookieController.exportConsentData);

// Delete user's consent data (right to be forgotten)
router.delete("/data", cookieController.deleteConsentData);

/**
 * Admin Endpoints
 */

// Get consent statistics
router.get("/stats", cookieController.getConsentStats);

module.exports = router;
