import { NextFunction, Request, Response } from "express";
import { AnyObjectSchema, object, string, number, ValidationError } from "yup";
import logger from "../../utils/logging";

export const validateCart = (schema: AnyObjectSchema) => {
	return async(req: Request, res: Response, next: NextFunction) => {
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


// For for Types
export const ProductSchema = {
	data: object().shape({
		productId: string().required(),
		quantity: number().required()
	})
};