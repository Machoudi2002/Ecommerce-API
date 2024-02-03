import { Schema, model } from 'mongoose';
import { IApi } from "../Model/api.model";

const apiSchema = new Schema<IApi>({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    api_key: {
        type: String,
        required: true,
        unique: true
    }
});

// Create and export the model
export const ApiKeys = model<IApi>('Api', apiSchema);