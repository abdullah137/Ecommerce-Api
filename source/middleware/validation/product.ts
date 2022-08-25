import { NextFunction, Request, Response } from "express";
import { AnyObjectSchema, ValidationError, string, number, boolean, object } from "yup";
import logger from "../../utils/logging";

export const validateProduct = ( schema: AnyObjectSchema ) => {
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

// For Uploading Products
export const ProductSchema = {
	data: object().shape({
		name: string().required(),
		description: string().required(),
		category: string().required(),
		price: number().required(),
		valid: boolean().required()
	})
};