import { Request, Response } from "express";
import { Cart } from "../../interfaces/validations/carts/index";

import ICart from "../../interfaces/models/cart";

// Import logger
import logger from "../../utils/logging";

// Database Imports
import Carts from "../../models/cart";
import Product from "../../models/products";

type Item = {
	items: Array<object>;
    productId: string;
    quantity: number;
    price: number;
    total: number;
    subTotal: number;
	id: string
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
				type: "Not Found",
				status: false,
				msg: "Sorry, The Product you just entered do not exist"
			});
		}



		const cart = await Carts.find().populate({
			path: "items.productId",
			select: "name price total"
		});


		//if cart exists
		if(cart) {
			const indexFound = cart.findIndex((item:Item) =>  item.productId == productId);

			if (indexFound !== -1 && quantity <= 0) {
				cart.splice(indexFound, -1);

			
			}
			
		


		} else {
			console.log("It is here");
		}

		//----------check if product exist,just add the previous quantity with the new quantity and update the total price-------
		
	} catch(err:any) {
		return res.status(500).json({
			error: "INTERNAL_ERROR",
			status: false,
			msg: err.message
		});
	}
};



export default { addToCart };