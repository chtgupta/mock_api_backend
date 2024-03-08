import express, { Request, Response } from 'express'
import { MockFolder, MockFolderModel } from '../models/mock_folder.model'
import { ApiResponse } from '../common/api_response'
import {Mock, MockModel} from "../models/mock.model";

const router = express.Router()

router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const mockFolders: MockFolderModel[] = await MockFolder.find()
        const mocks: MockModel[] = await Mock.find({ folderId: null })
        const response: ApiResponse = ApiResponse.success({
            folders: mockFolders,
            files: mocks
        })
        res.status(200).json(response)
    } catch (error: unknown) {
        const response: ApiResponse = ApiResponse.error((error as Error).message)
        res.status(500).json(response)
    }
})

module.exports = router