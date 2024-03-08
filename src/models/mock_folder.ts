import { Schema, Model, model } from 'mongoose'

export type MockFolderModel = {
    name: string
};

const MockFolderSchema: Schema<MockFolderModel> = new Schema<MockFolderModel>({
    name: {
        type: String,
        required: true
    }
});

export const MockFolder: Model<MockFolderModel> = model('MockFolder', MockFolderSchema)