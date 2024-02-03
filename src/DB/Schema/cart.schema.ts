
import { Schema, Types, model } from "mongoose";
import { ICart, ICartItem } from "../Model/cart.model";

const cartItemSchema = new Schema<ICartItem>({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const cartSchema = new Schema<ICart>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    items: [cartItemSchema]
});

export const Cart = model('Cart', cartSchema);
