import { Request, Response, NextFunction } from "express";
import logger from "../../utils/logging";
import jwt from "jsonwebtoken";
import { config } from "../../config/config";

const getJwt = (req:Request, res:Response, next:NextFunction) => {
	logger.info("Validating Token");

	const token = req.headers.authorization?.split(" ")[1];

	// checking if token exists
	if(token) {
		jwt.verify(token, config.token.secret, (error, decoded) => {
			if(error) {
				return res.status(404).json({
					message: error.message,
					status: false,
					error: "INTERNAL_ERROR"
				});

			}  else {
				res.locals.jwt = decoded;
				next();
			}
		});
	} else {
		return res.status(401).json({
			error: "UNAUTHORIZED",
			status: false,
			message: "Sorry, You are UnAuthorized"
		});
	}
};

export default getJwt;