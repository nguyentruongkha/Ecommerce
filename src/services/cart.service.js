import Cart from '../models/Cart.js'

const addProdintoCart = async (req,res) =>{
    const newCart = new Cart(req.body);
  
    try {
      const savedCart = await newCart.save();
      res.status(200).json(savedCart);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
}

const updatedCart = async (req,res) =>{
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedCart);
      } catch (err) {
        res.status(500).json(err);
      }
}

const deleteProdinCart = async (req,res) =>{
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
}

const getProdinCart = async (req,res) =>{
    try {
        const cart = await Cart.findById(req.params.id);
        res.status(200).json(cart); 
      } catch (err) {
        res.status(500).json(err);
      }
}

const getAllProdinCart = async (req,res) =>{
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
      } catch (err) {
        res.status(500).json(err);
      }
}

const CartService = {addProdintoCart,updatedCart,deleteProdinCart,getAllProdinCart,getProdinCart}

export default CartService