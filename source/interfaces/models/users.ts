import { Document } from "mongoose";

export default interface IUser extends Document {
    firstname: string; 
    lastname: string;
    email: string;
    address: string;
    password: string;
}