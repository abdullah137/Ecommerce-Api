import mongoose from "mongoose";
import { config }  from "../config/config";
import logger from "../utils/logging";

const databaseConnection = () => {

	return mongoose.connect( config.mongo.url, { 
		retryWrites: true, w: "majority"
	}).then(() => {
		logger.info("Connected to Mongodb");
	}).catch((error:unknown) => {
		logger.error(error);
	});
};

export default databaseConnection;
