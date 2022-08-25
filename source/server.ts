import express, { Application, Response, Request, NextFunction } from "express";
import http from "http";
import bodyParser from "body-parser";
import { config } from "./config/config";
import logger from "./utils/logging";

// Importing the database connection
import connect from "./database/connect";

// Importing the routes needed
import indexRoutes from "./routes/index";
import usersRoutes from "./routes/users/index";
import productRoutes from "./routes/products/index";
import cartRoutes from "./routes/cart/index";

const app:Application = express();

// Database Connection
connect();

//  Logging Request
app.use((req:Request, res:Response, next:NextFunction) => {
    
	logger.info(`METHOD - [${req.method}] URL - ${req.url} IP - [${req.socket.remoteAddress}]`);
	res.on("finish", () => {
		logger.info(`METHOD - [${req.method}] URL - ${req.url} IP - [${req.socket.remoteAddress}]`);
	});
	next();
});


// Parse the request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Rules for the API
app.use((req:Request, res:Response, next:NextFunction) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Header", "Origin, X-Request-With, Content-Type, Accept, Authorization");

	if (req.method == "OPTION") {
		res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST PUT");
		return res.status(200).json({});
	}
	next();
});

// Setting Up Routes
app.use("/", indexRoutes);
app.use("/users", usersRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

// Error Handling
app.use((req:Request, res:Response) => {
	const error = new Error("not found");

	return res.status(404).json({
		message: error.message
	});
});

// Creating the Server
http.createServer(app).listen(config.server.port, () => logger.info("Server Started"));