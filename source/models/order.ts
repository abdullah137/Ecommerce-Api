import mongoose, { Schema } from "mongoose";

// Interface imports
import IOrder from "../interfaces/models/order";

const orderSchema:Schema = new Schema({
	orderId: {
		type: String,
		required: true
	},
	orderQuantity: {
		type: Number,
		required: true
	},
	userId: {
		type: Schema.Types.ObjectId,
		required: true
	},
	orderDate: {
		type: Date,
		required: true
	},
	dueDate: {
		type: Date,
		required: true
	},
	channel: {
		type: String,
		enum: ["Pay On Delivery", "Instant Payment", "On Loan"],
		required: true
	},
	status: {
		type: Boolean,
		default: false
	}
});


export default mongoose.model<IOrder>("order", orderSchema);