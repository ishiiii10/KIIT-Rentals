import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
	try {
		const products = await Product.find({});
		res.status(200).json({ success: true, data: products });
	} catch (error) {
		console.log("Error in fetchProducts:", error.message);
		res.status(500).json({ success: false, message: "Failed to fetch products" });
	}
};

export const createProduct = async (req, res) => {
	const product = req.body; // user will send this data

	if (!product.name || !product.price || !product.image) {
		return res.status(400).json({ success: false, message: "Please provide all fields" });
	}

	try {
		const newProduct = new Product(product);
		await newProduct.save();
		res.status(201).json({ success: true, data: newProduct });
	} catch (error) {
		console.error("Error in createProduct:", error.message);
		res.status(500).json({ success: false, message: "Failed to create product" });
	}
};

export const updateProduct = async (req, res) => {
	const { id } = req.params;
	const product = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	try {
		const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
		
		if (!updatedProduct) {
			return res.status(404).json({ success: false, message: "Product not found" });
		}
		
		res.status(200).json({ success: true, data: updatedProduct });
	} catch (error) {
		console.error("Error in updateProduct:", error.message);
		res.status(500).json({ success: false, message: "Failed to update product" });
	}
};

export const deleteProduct = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	try {
		const deletedProduct = await Product.findByIdAndDelete(id);
		
		if (!deletedProduct) {
			return res.status(404).json({ success: false, message: "Product not found" });
		}
		
		res.status(200).json({ success: true, message: "Product deleted successfully" });
	} catch (error) {
		console.log("Error in deleteProduct:", error.message);
		res.status(500).json({ success: false, message: "Failed to delete product" });
	}
};