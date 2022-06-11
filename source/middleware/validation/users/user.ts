import { NextFunction, Request, Response } from "express";
import { AnyObjectSchema, ValidationError, date, object, string } from "yup";
import logger from "../../../utils/logging";

export const validateUser = ( schema:AnyObjectSchema) => {
	return async(req:Request, res:Response, next:NextFunction) => {
		try {

			const data = await schema.validate(req.body);

			logger.info(data);

			res.locals.data = data;

			next();

		}catch(error:unknown) {

			if(error instanceof ValidationError) {

				logger.error(error);
    
				return res.status(422).json({ error: error.message });
                
			}
		}
	};
};

// For Registration
export const RegistrationSchema = {
	data: object().shape({
		firstname:string().required(),
		lastname: string().required(),
		email: string().email().required(),
		address: string().required(),
		password: string().required(),
		cpassword: string().required()
	})
};

// For Login
export const LoginSchema = {
	data: object().shape({
		email: string().email().required(),
		password: string().required()
	})
};