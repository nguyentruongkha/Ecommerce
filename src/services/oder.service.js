import Order from "../models/Oder.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const deleteOder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

// FIXME: Test this function
const addOder = async (req, res) => {
  const add = await Cart.findOne({
    name: req.body.name,
    category: req.body.category,
  });

  const prodIdinCart = await Cart.map((prod) => prod.id);
  const product = await Product.findOne({ id: { $in: prodIdinCart } });

  for (let i = 0; i <= product.lenght(); i++) {
    if (add.category === product[i].category) {
      if (add.stock > product[i].stock) {
        req.send("Can not oder because out stock");
      }
      break;
    }
  }
};

const getOder = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

const oderService = { deleteOder, addOder, getOder };

export default oderService;
