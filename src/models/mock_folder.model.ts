import { Schema, Model, model } from 'mongoose'

export type MockFolderModel = {
    _id: string
    parentId: string | null
    name: string
}

const MockFolderSchema: Schema<MockFolderModel> = new Schema<MockFolderModel>({
    _id: Schema.Types.ObjectId,
    parentId: {
        type: String,
        required: false,
        default: null
    },
    name: {
        type: String,
        required: true
    }
})

export const MockFolder: Model<MockFolderModel> = model('MockFolder', MockFolderSchema)