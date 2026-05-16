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

const sendContactEmails = async ({ name, email, subject, message }) => {
  // Confirmation to the person who contacted
  await transporter.sendMail({
    from: `"IDmize" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "We received your message!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
        <div style="background: #1d4ed8; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">IDmize</h1>
        </div>
        <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px;">
          <h2 style="color: #1d4ed8;">Thanks, ${name}! 👋</h2>
          <p style="color: #555;">We've received your message and will get back to you within <strong>24 hours</strong>.</p>
          <div style="background: #f0f4ff; border-left: 4px solid #1d4ed8; padding: 15px; border-radius: 4px; margin: 20px 0;">
            <p style="margin: 0; color: #333;"><strong>Your Message:</strong></p>
            <p style="margin: 5px 0; color: #555;">Subject: ${subject || "No subject"}</p>
            <p style="margin: 5px 0; color: #555;">Message: ${message}</p>
          </div>
          <p style="color: #888; font-size: 12px; margin-top: 30px;">© 2025 IDmize. All rights reserved.</p>
        </div>
      </div>
    `,
  });

  // Notification to admin
  await transporter.sendMail({
    from: `"IDmize System" <${process.env.GMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Contact Message from ${name} — ${subject || "No subject"}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #1d4ed8;">New Contact Message 💬</h2>
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
            <td style="padding: 10px; font-weight: bold; border: 1px solid #ddd;">Subject</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${subject || "No subject"}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; border: 1px solid #ddd;">Message</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${message}</td>
          </tr>
        </table>
      </div>
    `,
  });
};

const createContactMessage = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }

  const { name, email, subject, message } = req.body;

  try {
    const contact = await prisma.contactMessage.create({
      data: { name, email, subject: subject || null, message },
    });

    sendContactEmails({ name, email, subject, message }).catch((err) =>
      console.error("Contact email sending failed:", err)
    );

    return res.status(201).json({
      success: true,
      message: "Message sent successfully. We'll get back to you within 24 hours.",
      data: {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        createdAt: contact.createdAt,
      },
    });
  } catch (error) {
    console.error("Error saving contact message:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

module.exports = { createContactMessage };