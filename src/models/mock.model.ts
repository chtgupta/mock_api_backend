import { Schema, Model, model } from 'mongoose'
import Constants from "../common/constants";

export type MockModel = {
    _id: string
    parentId: string | null
    name: string
    response: string
}

const MockSchema: Schema<MockModel> = new Schema<MockModel>({
    _id: Schema.Types.ObjectId,
    parentId: {
        type: String,
        required: false,
        default: Constants.rootPath
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