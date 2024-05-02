import mongoose, { Schema, Document } from "mongoose";

export interface Order extends Document {
  products: Array<{ productId: string; quantity: number }>;
  total: number;
}

const orderSchema: Schema = new Schema({
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
});

export default mongoose.model<Order>("Order", orderSchema);

