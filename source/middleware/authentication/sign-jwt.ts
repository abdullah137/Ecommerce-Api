import jwt from "jsonwebtoken";

import { config } from "../../config/config";
import logger from "../../utils/logging";
import IUser from "../../interfaces/models/users";

const signJwt = (user:IUser, callback:(error: Error | null, token:string | null) => void) => {

	const timeSinchEpach = new Date().getTime();
	const expirationTime = timeSinchEpach + Number(config.token.expireTime) * 100000;
	const expirationTimeInSeconds = Math.floor(expirationTime / 1000);
    
	logger.info("Attemping to sign token for ");
    
	try {
		jwt.sign({ email: user.email }, config.token.secret, {
			issuer: config.token.issuer,
			algorithm: "HS256",
			expiresIn: expirationTimeInSeconds
		}, (error, token) => {
			if(error) {
				callback(error, null);
			}else if(token) {
				callback(null, token);
			}
		});
	}catch(error:unknown | any) {
		logger.error(error.message);
		callback(error, null);
	}
};

export default signJwt;