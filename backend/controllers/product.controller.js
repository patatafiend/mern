import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  const { page } = await req.query;
  const limit = 12;
  const skip = (page - 1) * limit;
  try {
    const totalPage = await Product.countDocuments().then((n) =>
      Math.ceil(n / limit)
    );
    const products = await Product.find().skip(skip).limit(limit);
    res.status(200).json({ success: true, data: products, totalPage });
  } catch (error) {
    console.error("Error in Get products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body; // user will send the data in the body of the request

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in Create product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product ID" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product Updated",
    });
  } catch (error) {
    console.error("Error in Update product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product ID" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product is deleted" });
  } catch (error) {
    console.error("Error in Delete product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
