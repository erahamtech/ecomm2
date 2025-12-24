const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    code: { type: String, unique: true, required: true },
    type: { type: String, enum: ["flat", "percentage"], required: true },
    value: { type: Number, required: true },
    minOrderValue: Number,
    maxDiscount: Number,
    startsAt: Date,
    expiresAt: Date,
    usageLimit: Number,
    usedCount: { type: Number, default: 0 },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
