import { Request, Response } from "express";
import { Product } from "../../interfaces/validations/products/product";

// Database Imports
import Products from "../../models/products";

const addProducts = (req: Request, res:Response) => {

	const data = res.locals.data as Product;

	// still descructing the body
	const { name, description, price, category, valid } = data;

	// Doing some checkings
	if(!name || !description || !price || !category || !valid) {
		return res.status(400).json({
			error: "MISSING_FIELDS",
			status: false,
			message: "Please fill all important fileds"
		});
	}

	// Contructing the Model Object
	const newProduct = new Products({
		name,
		description,
		price,
		category,
		valid
	});

	// returns the save record as json
	return newProduct.save().then(result => {
		return res.status(201).json({
			message: "Product Created",
			status: true,
			query: result
		});
	});
};


const getAllProduct = (req: Request, res:Response) => {
	Products.find().exec().then(result => {
		return res.status(200).json({
			products: result,
			count: result.length
		});
	}).catch((error:any) => {
		return res.status(500).json({
			message: error.message,
			error
		});
	});
};

export default { addProducts, getAllProduct };