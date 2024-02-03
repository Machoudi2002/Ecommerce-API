import { Document, Types, Model } from "mongoose";

export interface ICartItem extends Document{
    product: Types.ObjectId;
    quantity: number;
}

export interface ICart extends Document {
    user: Types.ObjectId;
    items: ICartItem[];
}

interface ICartModel extends Model<ICart> {
    findByUserId(userId: Types.ObjectId): Promise<ICart | null>;
}