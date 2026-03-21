const express = require("express");
const { Resend } = require("resend");
const Otp = require("../model/Otp");  // ← tumhara model folder name "model" hai

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// POST /api/otp/send
router.post("/send", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  try {
    await Otp.deleteMany({ email });

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await Otp.create({ email, otp, expiresAt });

    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "🇫🇷 OTP for French Language Verification",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; padding: 30px; border: 1px solid #e0e0e0; border-radius: 12px;">
          <h2 style="color: #2563eb;">Language Verification</h2>
          <p>You requested to switch language to <strong>French 🇫🇷</strong></p>
          <p>Your OTP is:</p>
          <div style="font-size: 38px; font-weight: bold; letter-spacing: 10px; color: #1d4ed8; text-align: center; padding: 20px; background: #eff6ff; border-radius: 8px;">
            ${otp}
          </div>
          <p style="color: #6b7280; font-size: 13px; margin-top: 20px;">
            This OTP expires in <strong>10 minutes</strong>. Do not share it with anyone.
          </p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, message: "OTP sent successfully" });

  } catch (error) {
    console.error("Send OTP error:", error);
    return res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

// POST /api/otp/verify
router.post("/verify", async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ success: false, message: "Email and OTP required" });
  }

  try {
    const record = await Otp.findOne({ email, otp });

    if (!record) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (new Date() > record.expiresAt) {
      await Otp.deleteOne({ _id: record._id });
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    await Otp.deleteOne({ _id: record._id });

    return res.status(200).json({ success: true, message: "OTP verified successfully" });

  } catch (error) {
    console.error("Verify OTP error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;