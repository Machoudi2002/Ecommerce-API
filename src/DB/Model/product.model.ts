import { Document } from "mongoose";

export interface IProduct extends Document {
    name: string;
    slug: string;
    description: string;
    image: string;
    category: string;
    price: number;
    discount: number;
    quantity: number;
}