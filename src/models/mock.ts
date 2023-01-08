import mongoose, { Schema, Model, model } from 'mongoose'

export type MockModel = {
    name: string,
    response: string
};

const MockSchema: Schema<MockModel> = new Schema<MockModel>({
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