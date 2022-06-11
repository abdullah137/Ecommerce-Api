import mongoose, { Schema } from "mongoose";

import IUser from "../interfaces/models/users";

const userSchema:Schema = new Schema({

	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	email: {
		type: String, 
		required: true
	},
	address: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
}, { timestamps: true });

export default mongoose.model<IUser>("user", userSchema);

