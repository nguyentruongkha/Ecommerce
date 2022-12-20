import Product from "../models/Product.js";

const createProd = async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

const updateProd = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

const deleteProd = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getProd = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

// FIXME: Not in use
const uploadImg = async (req, res) => {
  res.status(200).json(req.file.path);
};

const searchProd = async (req, res) => {
  try {
    const search = await Product.find({ name: req.body.name });
    // FIXME: Need to explain why do this
    search.id = undefined;
    search.stock = undefined;
    res.status(200).json(search);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const ProdService = {
  createProd,
  updateProd,
  deleteProd,
  uploadImg,
  searchProd,
  getProd,
};

export default ProdService;
