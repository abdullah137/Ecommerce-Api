import IUser  from "./users";
import { Document } from "mongoose";

export default interface ISession extends Document {
    user: IUser["_id"];
    valid: boolean;
    userAgent: string;
    createdAt: Date;
    updatedAt: Date;
}