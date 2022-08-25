import { Document } from "mongoose";

export default interface ICart extends Document {
    items: Array<object>;
    productId: string;
    quantity: number;
    price: number;
    total: number;
    subTotal: number;
    id: string;
};