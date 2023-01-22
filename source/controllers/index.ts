import { Request, Response } from "express";

const homePage = (req:Request, res:Response) => {
	return res.status(200).json({
		page: "Home page",
		status: true,
		message: "Welcome to the home page section"
	});
};

const aboutPage = (req:Request, res:Response) => {
	return res.status(200).json({
		page: "About Page",
		status: true,
		message: "All Enquiry will be needed here"
	});
};

const contactPage = (req:Request, res:Response) => {
	return res.status(200).json({
		page: "Contact Page",
		status: true,
		message: "All infomation will be needed too as well"
	});
};

export default { homePage, aboutPage, contactPage };
 
