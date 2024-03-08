import { Schema, Model, model } from 'mongoose'

export type MockModel = {
    _id: string
    folderId: string | null
    name: string
    response: string
}

const MockSchema: Schema<MockModel> = new Schema<MockModel>({
    _id: Schema.Types.ObjectId,
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
})

export const Mock: Model<MockModel> = model('Mock', MockSchema)