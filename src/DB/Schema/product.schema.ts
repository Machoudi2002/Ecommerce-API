import mongoose from "mongoose";
import { IProduct } from "../Model/product.model";

const productSchema = new mongoose.Schema<IProduct>({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        maxlength: 200,
    },
    description: {
        type: String,
        required: true,
        maxlength: 1000,
    },
    image: {
        type: String,
        unique: true,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
        default: 0,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    }
},{ timestamps: true })


export const Product = mongoose.model<IProduct>('Product', productSchema);