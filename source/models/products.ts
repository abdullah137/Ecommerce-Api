import mongoose, { Schema } from "mongoose";

import IProduct from "../interfaces/models/products";

const productSchema:Schema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	valid: {
		type: Boolean,
		default: true
	}
});

export default mongoose.model<IProduct>("product", productSchema);