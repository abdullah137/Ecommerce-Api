import { Document } from "mongoose";

export default interface ICart extends Document {
    items: Array<object>;
    subTotal: number;
}