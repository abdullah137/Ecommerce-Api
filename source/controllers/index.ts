import { Request, Response } from "express";

const homePage = (req:Request, res:Response) => {
	return res.status(200).json({
		page: "Home page"
	});
};

const aboutPage = (req:Request, res:Response) => {
	return res.status(200).json({
		page: "About Page"
	});
};

const contactPage = (req:Request, res:Response) => {
	return res.status(200).json({
		page: "Contact Page"
	});
};

export default { homePage, aboutPage, contactPage };
 
