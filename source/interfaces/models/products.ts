import { Document } from "mongoose";

export default interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    category: string;
    valid: boolean
}