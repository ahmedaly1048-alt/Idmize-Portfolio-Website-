require("dotenv").config();
const express = require("express");
const cors = require("cors");
const prisma = require("./models/prismaClient");
const demoRoutes = require("./routes/demoRoutes");
const contactRoutes = require("./routes/contactRoutes");
const cookieRoutes = require("./routes/cookieRoutes");
const { consentTracking } = require("./middleware/consentMiddleware");

const app = express();
const PORT = process.env.PORT || 5001;

// ── Middleware ──────────────────────────────────────────────
app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    "https://idmize.com",
    "https://www.idmize.com",
    "http://localhost:3000",
    "http://localhost:3001",
  ],
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json({ limit: "10kb" }));

// Consent tracking middleware
app.use(consentTracking);

// ── Routes ──────────────────────────────────────────────────
app.get("/health", (req, res) =>
  res.json({ status: "ok", timestamp: new Date().toISOString() })
);

app.use("/api/demo", demoRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/cookies", cookieRoutes);

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