import dotenv from 'dotenv'
import express, { Request, Response, Application } from 'express'
import mongoose, { Connection } from 'mongoose'
import { MockModel, Mock } from './models/mock'
import { ApiResponse } from './models/api_response'
import cors from 'cors';

dotenv.config()
const app: Application = express()

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URL as string)
const db: Connection = mongoose.connection

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const mocks: MockModel[] = await Mock.find()
        const response: ApiResponse = ApiResponse.success(mocks)
        res.status(200).json(response)
    } catch (error: unknown) {
        const response: ApiResponse = ApiResponse.error((error as Error).message)
        res.status(500).json(response)
    }
})

app.get('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const mock: MockModel | null = await Mock.findById(req.params.id)
        if (mock != null) {
            const response: ApiResponse = ApiResponse.success(mock)
            res.status(200).json(response)
        } else {
            const response: ApiResponse = ApiResponse.error(`No document found with id ${req.params.id}`)
            res.status(404).json(response)
        }
    } catch (error: unknown) {
        const response: ApiResponse = ApiResponse.error('An error occured')
        res.status(500).json(response)
    }
})

app.get('/mock/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const mock: MockModel | null = await Mock.findById(req.params.id)
        if (mock != null) {
            res.status(200).json(JSON.parse(mock.response))
        } else {
            const response: ApiResponse = ApiResponse.error(`No document found with id ${req.params.id}`)
            res.status(404).json(response)
        }
    } catch (error: unknown) {
        const response: ApiResponse = ApiResponse.error('An error occured')
        res.status(500).json(response)
    }
})

app.post('/', async (req: Request, res: Response): Promise<void> => {

    const data = new Mock({
        name: req.body.name,
        response: req.body.response
    })
    try {
        const mock: MockModel = await data.save()
        const response: ApiResponse = ApiResponse.success(mock, 'Document created')
        res.status(201).json(response)
    } catch (error: unknown) {
        const response: ApiResponse = ApiResponse.error((error as Error).message)
        res.status(401).json(response)
    }
})

app.put('/:id', async (req: Request, res: Response): Promise<void> => {
    try {

        const newName: string | null = req.body.name;
        const newResponse: string | null = req.body.response;

        const query: mongoose.UpdateQuery<MockModel> = { name: newName, response: newResponse }

        Mock.findByIdAndUpdate(req.params.id, query, (updateError: mongoose.CallbackError) => {
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

app.delete('/:id', async (req: Request, res: Response): Promise<void> => {

    try {
        Mock.findByIdAndDelete(req.params.id, null, (deleteError: mongoose.CallbackError) => {
            if (deleteError) {
                const response: ApiResponse = ApiResponse.error((deleteError as Error).message)
                res.status(500).json(response)
            } else {
                const response: ApiResponse = ApiResponse.success(null, `Document with id ${req.params.id} removed`)
                res.status(200).json(response)
            }
        })
    } catch (error: unknown) {
        const response: ApiResponse = ApiResponse.error((error as Error).message)
        res.status(500).json(response)
    }

})

app.listen(process.env.PORT, (): void => {
    console.log('Server running..')
})