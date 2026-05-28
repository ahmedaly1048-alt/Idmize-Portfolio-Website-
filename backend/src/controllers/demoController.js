const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const prisma = require("../models/prismaClient");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const sendEmails = async ({ name, email, company, role, service, message }) => {
  // 1. Confirmation to user
  await transporter.sendMail({
    from: `"IDmize" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Your IDmize Demo Request Has Been Received",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
        <div style="background: linear-gradient(135deg, #1d4ed8, #059669); padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 22px; letter-spacing: 1px;">IDmize</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 6px 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">AI Governance Platform</p>
        </div>
        <div style="background: white; padding: 32px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none;">
          <h2 style="color: #111827; font-size: 18px; margin: 0 0 8px;">Request Received, ${name} ✓</h2>
          <p style="color: #6b7280; font-size: 13px; line-height: 1.6; margin: 0 0 20px;">
            Thank you for your interest in IDmize. Our enterprise team has received your request and will be in touch within <strong style="color: #111827;">24 hours</strong> to schedule a personalized session.
          </p>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 3px solid #1d4ed8; border-radius: 4px; padding: 16px; margin: 0 0 20px;">
            <p style="margin: 0 0 10px; color: #374151; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Your Submission Summary</p>
            <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
              <tr><td style="padding: 4px 0; color: #9ca3af; width: 100px;">Company</td><td style="padding: 4px 0; color: #111827; font-weight: 500;">${company}</td></tr>
              <tr><td style="padding: 4px 0; color: #9ca3af;">Role</td><td style="padding: 4px 0; color: #111827; font-weight: 500;">${role || "Not specified"}</td></tr>
              <tr><td style="padding: 4px 0; color: #9ca3af;">Service</td><td style="padding: 4px 0; color: #059669; font-weight: 600;">${service || "Not specified"}</td></tr>
              ${message ? `<tr><td style="padding: 4px 0; color: #9ca3af; vertical-align: top;">Notes</td><td style="padding: 4px 0; color: #111827;">${message}</td></tr>` : ''}
            </table>
          </div>

          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 4px; padding: 12px; margin: 0 0 24px;">
            <p style="margin: 0; color: #166534; font-size: 11px;">
              <strong>What happens next?</strong> Our enterprise team will review your requirements and reach out to schedule a tailored demonstration of the IDmize platform.
            </p>
          </div>

          <a href="https://idmize.com" style="display: inline-block; background: linear-gradient(135deg, #1d4ed8, #1e40af); color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 12px; font-weight: 600;">Visit IDmize →</a>

          <p style="color: #9ca3af; font-size: 10px; margin: 24px 0 0; border-top: 1px solid #f3f4f6; padding-top: 16px;">
            © 2025 IDmize. All rights reserved. · <a href="https://idmize.com" style="color: #6b7280;">idmize.com</a>
          </p>
        </div>
      </div>
    `,
  });

  // 2. Notification to info@idmize.com
  await transporter.sendMail({
    from: `"IDmize System" <${process.env.GMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `🔔 New Demo Request — ${name} · ${company}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #1d4ed8, #059669); padding: 16px 20px; border-radius: 8px 8px 0 0;">
          <h2 style="color: white; margin: 0; font-size: 16px;">New Enterprise Demo Request</h2>
          <p style="color: rgba(255,255,255,0.75); margin: 4px 0 0; font-size: 11px;">Submitted via idmize.com</p>
        </div>
        <div style="background: white; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; overflow: hidden;">
          <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
            <tr style="background: #f8fafc;">
              <td style="padding: 10px 16px; font-weight: bold; color: #374151; border-bottom: 1px solid #e5e7eb; width: 120px;">Full Name</td>
              <td style="padding: 10px 16px; color: #111827; font-weight: 600; border-bottom: 1px solid #e5e7eb;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 16px; font-weight: bold; color: #374151; border-bottom: 1px solid #e5e7eb;">Email</td>
              <td style="padding: 10px 16px; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${email}" style="color: #1d4ed8;">${email}</a></td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 10px 16px; font-weight: bold; color: #374151; border-bottom: 1px solid #e5e7eb;">Company</td>
              <td style="padding: 10px 16px; color: #111827; font-weight: 600; border-bottom: 1px solid #e5e7eb;">${company}</td>
            </tr>
            <tr>
              <td style="padding: 10px 16px; font-weight: bold; color: #374151; border-bottom: 1px solid #e5e7eb;">Role</td>
              <td style="padding: 10px 16px; color: #111827; border-bottom: 1px solid #e5e7eb;">${role || "Not specified"}</td>
            </tr>
            <tr style="background: #f0fdf4;">
              <td style="padding: 10px 16px; font-weight: bold; color: #374151; border-bottom: 1px solid #e5e7eb;">Service</td>
              <td style="padding: 10px 16px; color: #059669; font-weight: 700; border-bottom: 1px solid #e5e7eb;">${service || "Not specified"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 16px; font-weight: bold; color: #374151; vertical-align: top;">Notes</td>
              <td style="padding: 10px 16px; color: #111827;">${message || "—"}</td>
            </tr>
          </table>
          <div style="padding: 12px 16px; background: #fffbeb; border-top: 1px solid #fde68a;">
            <p style="margin: 0; font-size: 11px; color: #92400e;">⚡ Respond within 24 hours to maintain enterprise service standards.</p>
          </div>
        </div>
      </div>
    `,
  });
};

const createDemoRequest = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }

  const { name, email, company, role, service, message } = req.body;

  try {
    const demoRequest = await prisma.demoRequest.create({
      data: {
        name,
        email,
        company,
        role: role || null,
        message: message || null,
      },
    });

    sendEmails({ name, email, company, role, service, message }).catch((err) =>
      console.error("Email sending failed:", err)
    );

    return res.status(201).json({
      success: true,
      message: "Request submitted successfully. We'll be in touch within 24 hours.",
      data: {
        id: demoRequest.id,
        name: demoRequest.name,
        email: demoRequest.email,
        createdAt: demoRequest.createdAt,
      },
    });
  } catch (error) {
    console.error("Error creating demo request:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

module.exports = { createDemoRequest };