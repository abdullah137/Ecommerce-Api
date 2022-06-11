import { Request, Response } from "express";
import { UserData } from "../../interfaces/validations/users/user";
import bcrypt from "bcryptjs";

// Logger function
import logger from "../../utils/logging";

// Database Imports
import User from "../../models/user";

// Importing Custom Sign Function
import signJwt from "../../middleware/authentication/sign-jwt";


const registerUser = (req:Request, res:Response,) => {

	const data = res.locals.data as UserData;

	// deconstructing the body
	const { address, firstname, lastname, email, password, cpassword } = data;
    
	// Performing some checkings
	if(!address || !firstname || !lastname || !email || !password || !cpassword) {
		return res.status(400).json({
			error: "MISSING_FIELDS",
			status: false,
			message: "Please fill all important fileds"
		}); 
	} 

	// check if pasword is the same or not
	if(password != cpassword){

		return res.status(400).json({
			error: "PASSWORD_NOT_SAME",
			status: false,
			message: "Password do not match"
		}); 
	}

	User.findOne({ email: email }).then((user) => {
		if(user) {
			return res.status(400).json({
				error: "USER_EXIST",
				status: false,
				message: "Sorry, User Already Exist"
			});
		} else {

			// Hashing password
			bcrypt.hash(password, 10, (hashError, hash) => {
				if(hashError) {
					return res.status(500).json({
						message: hashError.message,
						error: hashError,
						status: false
					});
				}

				// Constructing Model Object
				const newUser = new User({
					firstname,
					lastname,
					email,
					address,
					password: hash
				});

				return newUser.save().then(result => {
					return res.status(201).json({
						message: "User Created Successfuly",
						status: true,
						result
					});

				}).catch(error => {
					logger.error(error);
					return res.status(500).json({
						error: "INTERNAL_ERROR",
						message: error.message,
						status: false
					});
				});

			});
		}
	}); 
};

const login = (req: Request, res:Response) => {
	
	const { email, password } = res.locals.data as UserData;

	User.find({ email }).exec().then(user => {
		if(user.length !== 1) {
			return res.status(401).json({
				error: "NONE_EXISTENCE",
				status: false,
				message: "Sorry, User Do Not Exist"
			});
		}

		bcrypt.compare(password, user[0].password, (error, result) => {
			if(error) {
				return res.status(401).json({
					message: "Sorry, Internal Error Occured",
					error: "INTERNAL_ERROR",
					status: false
				});
			} else if(  result ) {
				signJwt(user[0], (_error, token) => {
					if(_error) {
						logger.error("Unable to Sign In Token");

						return res.status(401).json({
							message: "Unauthorized",
							error: _error,
							status: false
						});
					} else if(token) {
						return res.status(200).json({
							message: "Auth Successful",
							token,
							user: user[0]
						});
					}
				});
			}
		});

	}).catch(error => {
		return res.status(500).json({
			message: error.message,
			error
		});
	});

};

const getAllUsers = (req: Request, res:Response) => {
	User.find().select("-password").exec().then(users => {
		return res.status(200).json({
			users,
			count: users.length
		});
	}).catch((error:any) => {
		return res.status(500).json({
			message: error.message,
			error
		});
	}) ;
};

export default { registerUser, login, getAllUsers};
