const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { ROLE_CUSTOMER } = require("../constants/roles");

const addressSchema = new mongoose.Schema(
  {
    label: String,
    fullName: String,
    phone: String,
    line1: String,
    line2: String,
    city: String,
    state: String,
    country: String,
    pincode: String,
    isDefault: { type: Boolean, default: false }
  },
  { _id: true }
);

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      unique: true,
      sparse: true
    },
    password: {
      type: String,
      select: false
    },
    name: String,
    role: {
      type: String,
      enum: ["admin", "seller", "customer"],
      default: ROLE_CUSTOMER
    },
    isActive: {
      type: Boolean,
      default: true
    },
    addresses: [addressSchema],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      }
    ],
    otpHash: {
      type: String,
      select: false
    },
    otpExpiresAt: {
      type: Date,
      select: false
    },
    tokenVersion: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true, sparse: true });
userSchema.index({ phone: 1 }, { unique: true, sparse: true });

userSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.comparePassword = async function (plain) {
  if (!this.password) return false;
  return bcrypt.compare(plain, this.password);
};

module.exports = mongoose.model("User", userSchema);
