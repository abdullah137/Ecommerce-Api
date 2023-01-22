import { Request, Response } from "express";
import { Cart } from "../../interfaces/validations/carts/index";

import ICart from "../../interfaces/models/cart";

// Import logger
import logger from "../../utils/logging";

// Database Imports
import Carts from "../../models/cart";
import Product from "../../models/products";


interface ArrayProduct {
	productId: {
		id: string,
		name: string,
		price: number,
	},
	quantity: number,
	price: number,
	total: number,
	_id: string,
	updatedAt: Date,
	createdAt: Date
}

interface Testing {
	_id: string;
	items: ArrayProduct[],
	subTotal: number,
	createdAt: Date,
	updatedAt: Date,
	__v: number;
}

const addToCart = async (req: Request, res:Response) => {
	const data = res.locals.data as Cart;

	// deconstructing the data
	const { quantity, productId } = data;

	// check if the the cart is already added
	try {

		// Check if the product exist
		const productDetails = await Product.findById(productId);

		const numberEntered = Number.parseInt(req.body.quantity);

		if(!productDetails) {
			return res.status(500).json({
				error: "NOT_FOUND",
				status: false,
				msg: "Sorry, The Product you just entered do not exist"
			});
		}

		const cart = await Carts.find().populate({
			path: "items.productId",
			select: "name price total"
		});

		console.log(cart);
		console.log(cart[0].items);
		
		if(cart.length > 0) {
			// Check if index exists
			const indexFound = cart[0].items.findIndex((item: any) => item.productId.id == productId);
			// ---- This removed an item from the cart if found any
			if(indexFound !== -1 && Number(quantity) <= 0) {
				cart[0].items.splice(indexFound, 1);
			}


			if(cart[0].items.length == 0) {
				cart[0].subTotal = 0;
			} else {
				cart[0].subTotal = cart[0].items.map((item: any) => item?.total).reduce((acc, next) => acc + next);
			}

		} else if(quantity > 0) {
			cart[0].items.push({
				productId: productId,
				quanity: quantity,
				price: productDetails?.price,
				total: productDetails?.price * quantity
			});
			cart[0].subTotal = cart[0].items.map((item: any) => item?.total).reduce((acc, next) => acc + next);
		}else {

			console.log("It is here 2");
			
			const cartData = {
				items: [{
					productId: productId,
					quantity: quantity,
					total:productDetails?.price * quantity,
					price: productDetails?.price
				}],
				subTotal: (productDetails?.price * quantity)
			};

			// Adding Section to cart
			const cart = await Carts.create(cartData);

			return res.status(200).json({
				query: "SUCCESS",
				status: true,
				data: cart
			});
		}
		
	
	} catch(err:any) {
		return res.status(500).json({
			error: "INTERNAL_ERROR",
			status: false,
			msg: err.message
		});
	}
};


const getCart = async(req: Request, res: Response) => {
	try {
		const cart = await Carts.find().populate({
			path: "items.productId",
			select: "name price total"
		});
		
		if(!cart) {
			return res.status(404).json({
				error: "CART_EMPTY",
				status: true,
				message: "Oops, you cart is empty."
			});
		}

		return res.status(200).json({
			message: "CART_LISTS",
			status: true,
			products: cart
		});

	}catch(error: any) {
		logger.error(error);
		return res.status(500).json({
			error: "INTERNAL_ERROR",
			status: false,
			message: error.message
		});
	}
};


const emptyCart = async(req: Request, res: Response) => {
	try {
		const cart = await Carts.find();

		return res.status(200).json({
			message: "QUERY_SUCCESS",
			status: true,
			data: cart
		});
	}catch(error: any) {
		logger.error(error);
		return res.status(400).json({
			error: "INTERNAL_ERROR",
			status: false,
			message: "Some internal error occured",
		});
	}
};



export default { addToCart, getCart, emptyCart };