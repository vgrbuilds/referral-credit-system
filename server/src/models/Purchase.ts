import mongoose, { Document, Schema } from "mongoose";

export interface IPurchase extends Document {
  user: mongoose.Types.ObjectId;
  isFirstPurchase: boolean;
  createdAt: Date;
}

const PurchaseSchema = new Schema<IPurchase>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // ensures only ONE first purchase per user
    },

    isFirstPurchase: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Purchase = mongoose.model<IPurchase>("Purchase", PurchaseSchema);
