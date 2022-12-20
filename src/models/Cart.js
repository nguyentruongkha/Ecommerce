import mongoose from "mongoose";
// FIXME: Wrong schema
const CartS = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    id: {
      type: Number,
      default: 1,
    },
    stock: { type: Number },
    category: { type: String, require: true },
    price: {
      type: Number,
      require: true,
    },
    img: {
      type: Buffer,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartS);

export default Cart;
