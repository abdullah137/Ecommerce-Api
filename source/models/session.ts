import mongoose, { Schema } from "mongoose";

import ISession from "../interfaces/models/session";


const sessionSchema:Schema = new Schema({
	user: {
		type: mongoose.Types.ObjectId,
		ref: "user",
		required: true,
	},
	valid: {
		type: Boolean,
		default: true
	},
	userAgenet: { type: String }
}, { timestamps: true });

export default mongoose.model<ISession>("session", sessionSchema);