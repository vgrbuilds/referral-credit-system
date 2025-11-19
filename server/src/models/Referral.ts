import mongoose, { Document, Schema } from "mongoose";

export interface IReferral extends Document {
  referrer: mongoose.Types.ObjectId;
  referredUser: mongoose.Types.ObjectId;
  status: "pending" | "converted";
  createdAt: Date;
  updatedAt: Date;
}

const ReferralSchema = new Schema<IReferral>(
  {
    referrer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    referredUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "converted"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Ensure unique pair (a user cannot be referred twice)
ReferralSchema.index({ referrer: 1, referredUser: 1 }, { unique: true });

export const Referral = mongoose.model<IReferral>("Referral", ReferralSchema);
