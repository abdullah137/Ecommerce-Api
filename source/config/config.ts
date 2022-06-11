import dotenv from "dotenv";

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || ""; // ?? Enter your username here
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || ""; // ?? Enter your password here
const MONGO_DB = process.env.MONGO_DB || ""; // ? Enter your DB HERE
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.xbjva.mongodb.net/${MONGO_DB}`;

const TOKEN_SECRET = process.env.TOKEN_SECRET || "";
const TOKEN_EXPIRETIME = process.env.TOKEN_EXPIRE_TIME || "";
const TOKEN_ISSUER = process.env.TOKEN_ISSUER || "";

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;

export const config = { 
	mongo: {
		url: MONGO_URL
	},
	server: {
		port: SERVER_PORT
	},
	token: {
		expireTime: TOKEN_EXPIRETIME,
		issuer: TOKEN_ISSUER,
		secret: TOKEN_SECRET
	}
};