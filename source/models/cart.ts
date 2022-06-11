import mongoose, { Schema } from "mongoose";

// Interface for carts
import ICart from "../interfaces/models/cart";

const itemSchema:Schema = new Schema({
	productId: {
		type: Schema.Types.ObjectId,
		ref: "product",
		required: true
	},
	quantity: {
		type: Number,
		required: true,
		min: [1, "Quantity can not be less than 1. " ]
	},
	price: {
		type: Number,
		required: true
	},
	total: {
		type: Number,
		required: true   
	}
}, { timestamps: true });

const cartSchema:Schema = new Schema({
	items: [itemSchema],
	subTotal: {
		default: 0,
		type: Number
	}
}, { timestamps: true });

export default mongoose.model<ICart>("cart", cartSchema);