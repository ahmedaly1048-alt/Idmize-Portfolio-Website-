require("dotenv").config();
const express = require("express");
const cors = require("cors");
const prisma = require("./models/prismaClient");
const demoRoutes = require("./routes/demoRoutes");
const contactRoutes = require("./routes/contactRoutes");



const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json({ limit: "10kb" }));

// ── Routes ──────────────────────────────────────────────────
app.get("/health", (req, res) =>
  res.json({ status: "ok", timestamp: new Date().toISOString() })
);

app.get("/test-email", async (req, res) => {
  const nodemailer = require("nodemailer");
  console.log("GMAIL_USER:", process.env.GMAIL_USER);
  console.log("Password length:", process.env.GMAIL_APP_PASSWORD?.length);
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.verify();
    res.json({ success: true, message: "Gmail connected!" });
  } catch (err) {
    res.json({ 
      success: false, 
      error: err.message, 
      user: process.env.GMAIL_USER, 
      passLength: process.env.GMAIL_APP_PASSWORD?.length 
    });
  }
});

app.use("/api/demo", demoRoutes);
app.use("/api/contact", contactRoutes);


// ── 404 Handler ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// ── Global Error Handler ─────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, message: "Something went wrong." });
});

// ── Start ────────────────────────────────────────────────────
async function main() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected");
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  } catch (error) {
    console.error("❌ Failed to start:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();