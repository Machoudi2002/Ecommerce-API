import { Document, Types } from "mongoose";

export interface IOrder extends Document {
    user: Types.ObjectId;
    fullname: string;
    shippingInfo: object;
    products: Array<{
        product: Types.ObjectId;
        quantity: number;
    }>;
    totalAmount: number;
}