import { Document } from "mongoose";

export default interface IOrder extends Document {
    orderId: string;
    orderQuantity: number;
    userId: object;
    orderDate: string;
    dueDate: string;
    chanel: string;
    status: boolean
}