const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const prisma = require("../models/prismaClient");

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Send confirmation email to client + notify admin
const sendEmails = async ({ name, email, company, role, message }) => {
  // 1. Confirmation email to the person who submitted
  await transporter.sendMail({
    from: `"IDmize" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "We received your demo request!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
        <div style="background: #1d4ed8; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">IDmize</h1>
        </div>
        <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px;">
          <h2 style="color: #1d4ed8;">Thanks, ${name}! 🎉</h2>
          <p style="color: #555;">We've received your demo request and will get back to you within <strong>24 hours</strong>.</p>
          <div style="background: #f0f4ff; border-left: 4px solid #1d4ed8; padding: 15px; border-radius: 4px; margin: 20px 0;">
            <p style="margin: 0; color: #333;"><strong>Your Details:</strong></p>
            <p style="margin: 5px 0; color: #555;">Company: ${company}</p>
            <p style="margin: 5px 0; color: #555;">Role: ${role || "Not specified"}</p>
            <p style="margin: 5px 0; color: #555;">Message: ${message || "No message provided"}</p>
          </div>
          <p style="color: #555;">In the meantime, feel free to explore our platform.</p>
          <p style="color: #888; font-size: 12px; margin-top: 30px;">© 2025 IDmize. All rights reserved.</p>
        </div>
      </div>
    `,
  });

  // 2. Notification email to admin
  await transporter.sendMail({
    from: `"IDmize System" <${process.env.GMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Demo Request from ${name} — ${company}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #1d4ed8;">New Demo Request 🚀</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="background: #f0f4ff;">
            <td style="padding: 10px; font-weight: bold; border: 1px solid #ddd;">Name</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; border: 1px solid #ddd;">Email</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
          </tr>
          <tr style="background: #f0f4ff;">
            <td style="padding: 10px; font-weight: bold; border: 1px solid #ddd;">Company</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${company}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; border: 1px solid #ddd;">Role</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${role || "Not specified"}</td>
          </tr>
          <tr style="background: #f0f4ff;">
            <td style="padding: 10px; font-weight: bold; border: 1px solid #ddd;">Message</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${message || "No message"}</td>
          </tr>
        </table>
      </div>
    `,
  });
};

// POST /api/demo
const createDemoRequest = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }

  const { name, email, company, role, message } = req.body;

  try {
    // Save to DB
    const demoRequest = await prisma.demoRequest.create({
      data: { name, email, company, role: role || null, message: message || null },
    });

    // Send emails (don't block response if email fails)
    sendEmails({ name, email, company, role, message }).catch((err) =>
      console.error("Email sending failed:", err)
    );

    return res.status(201).json({
      success: true,
      message: "Demo request submitted! Check your email for confirmation.",
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