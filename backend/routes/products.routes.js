import { Router } from "express";
import mongoose from "mongoose";
import Product from "../models/product.model.js";

class Products {
  constructor() {
    this.router = Router();
    this.routes()
  }

  async getProducts(req, res) {
    try {
      const products = await Product.find({});
      res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      console.error(`Error in fetching products: ${error.message}`);
      res.status(404).json({
        success: false,
        message: "Not Found",
      });
    }
  }

  async createProduct(req, res) {
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
      return res.status(400).json({
        success: false,
        message: "Please provide all fields",
      });
    }

    const newProduct = new Product(product);
    try {
      await newProduct.save();
      res.status(201).json({
        success: true,
        data: newProduct,
      });
    } catch (error) {
      console.error(`Error in creating product: ${error.message}`);
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  }

  async updateProducts(req, res) {
    const { id } = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "Invalid Product ID",
      });
    }
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, product, {
        new: true,
      });
      res.status(200).json({
        success: true,
        data: updatedProduct,
        message: "Product Updated",
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: "Server error",
      });
    }
  }

  async deleteProduct(req, res) {
    const { id } = req.params;
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json({
        success: true,
        message: "Product deleted",
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
  }

  routes() {
    this.router.get("/", this.getProducts);
    this.router.post("/", this.createProduct);
    this.router.put("/:id", this.updateProducts);
    this.router.delete("/:id", this.deleteProduct);
  }

}

const productRoutes = new Products()
export default productRoutes.router