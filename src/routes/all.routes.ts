import express, { Request, Response } from 'express'
import { MockFolder, MockFolderModel } from '../models/mock_folder.model'
import { ApiResponse } from '../common/api_response'
import {Mock, MockModel} from "../models/mock.model";
import MockFolderHelper from "../helper/mock_folder.helper";
import MockHelper from "../helper/mock.helper";

const router = express.Router()

router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const mockFolders: MockFolderModel[] = await MockFolder.find()
        const mocks: MockModel[] = await Mock.find({ folderId: null })
        const response: ApiResponse = ApiResponse.success({
            folders: mockFolders.map((e) => MockFolderHelper.toJson(e, null)),
            files: mocks.map((e) => MockHelper.toJson(e))
        })
        res.status(200).json(response)
    } catch (error: unknown) {
        const response: ApiResponse = ApiResponse.error((error as Error).message)
        res.status(500).json(response)
    }
})

module.exports = router