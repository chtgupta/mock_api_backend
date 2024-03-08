import { Schema, Model, model } from 'mongoose'

export type MockModel = {
    folderId: string | null
    name: string
    response: string
};

const MockSchema: Schema<MockModel> = new Schema<MockModel>({
    folderId: {
        type: String,
        required: false,
        default: null
    },
    name: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    }
});

export const Mock: Model<MockModel> = model('Mock', MockSchema)