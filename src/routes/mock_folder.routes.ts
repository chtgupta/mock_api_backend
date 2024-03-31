import express, { Request, Response } from 'express'
import { MockFolder, MockFolderModel } from '../models/mock_folder.model'
import { ApiResponse } from '../common/api_response'
import mongoose, {Types} from 'mongoose'
import {Mock, MockModel} from "../models/mock.model";
import MockFolderHelper from "../helper/mock_folder.helper";
import Constants from "../common/constants";

const router = express.Router()

router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const root: MockFolderModel = {
            _id: Constants.rootPath,
            parentId: null,
            name: 'Root'
        }
        const mockFolders: MockFolderModel[] = await MockFolder.find({ parentId: Constants.rootPath })
        const mocks: MockModel[] = await Mock.find({ parentId: Constants.rootPath })
        const response: ApiResponse = ApiResponse.success(MockFolderHelper.toJson(root, mockFolders, mocks))
        res.status(200).json(response)
    } catch (error: unknown) {
        const response: ApiResponse = ApiResponse.error((error as Error).message)
        res.status(500).json(response)
    }
})

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const mockFolder: MockFolderModel | null = await MockFolder.findById(req.params.id)
        if (mockFolder != null) {
            const subFolders: MockFolderModel[] = await MockFolder.find({ parentId: req.params.id })
            const mocks: MockModel[] = await Mock.find({ parentId: req.params.id })
            const response: ApiResponse = ApiResponse.success(MockFolderHelper.toJson(mockFolder, subFolders, mocks))
            res.status(200).json(response)
        } else {
            const response: ApiResponse = ApiResponse.error(`No document found with id ${req.params.id}`)
            res.status(404).json(response)
        }
    } catch (error: unknown) {
        const response: ApiResponse = ApiResponse.error('An error occurred')
        res.status(500).json(response)
    }
})

router.post('/', async (req: Request, res: Response): Promise<void> => {

    const data = new MockFolder({
        _id: new Types.ObjectId(),
        parentId: req.body.parentId,
        name: req.body.name
    })
    try {
        const mockFolder: MockFolderModel = await data.save()
        const response: ApiResponse = ApiResponse.success(MockFolderHelper.toJson(mockFolder), 'Document created')
        res.status(201).json(response)
    } catch (error: unknown) {
        const response: ApiResponse = ApiResponse.error((error as Error).message)
        res.status(401).json(response)
    }
})

router.put('/:id', async (req: Request, res: Response): Promise<void> => {
    try {

        const newName: string | null = req.body.name

        const query: mongoose.UpdateQuery<MockFolderModel> = { name: newName }

        MockFolder.findByIdAndUpdate(req.params.id, query, (updateError: mongoose.CallbackError) => {
            if (updateError) {
                const response: ApiResponse = ApiResponse.error((updateError as Error).message)
                res.status(500).json(response)
            } else {
                const response: ApiResponse = ApiResponse.success(null, 'Document updated successfully')
                res.status(200).json(response)
            }
        })
    } catch (error: unknown) {
        const response: ApiResponse = ApiResponse.error((error as Error).message)
        res.status(500).json(response)
    }
})

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {

    try {
        await deleteChildren(req.params.id)
        const response: ApiResponse = ApiResponse.success(null, `Document with id ${req.params.id} removed`)
        res.status(200).json(response)
    } catch (error: unknown) {
        const response: ApiResponse = ApiResponse.error((error as Error).message)
        res.status(500).json(response)
    }

})

async function deleteChildren(folderId: string): Promise<void> {

    // deleting folder
    await MockFolder.findByIdAndDelete(folderId)

    // deleting child files
    await Mock.deleteMany({ parentId: folderId })

    // getting child folders
    const childFolders: MockFolderModel[] = await MockFolder.find({ parentId: folderId })

    // deleting child folders
    await MockFolder.deleteMany({ parentId: folderId })

    // recursively deleting children folder contents
    for (const childFolder of childFolders) {
        await deleteChildren(childFolder._id);
    }

}

module.exports = router