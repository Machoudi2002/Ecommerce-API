import { Schema, model } from "mongoose";
import { IOrder } from "../Model/order.model";

const orderSchema = new Schema<IOrder>({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    fullname: {
        type: String,
        required: true,
    },
    shippingInfo: {
        type: Object,
        required: true,
    },
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: "Product"
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

export const Order = model<IOrder>("Order", orderSchema)