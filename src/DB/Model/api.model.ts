import { Document, Types } from "mongoose";

export interface IApi extends Document {
    user: Types.ObjectId;
    api_key: string;
}