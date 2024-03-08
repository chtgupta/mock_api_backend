import dotenv from 'dotenv'
import express, { Application } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

configureEnv()
configureDb()
configureServer()

function configureEnv(): void {
    dotenv.config()
}

function configureDb() {
    mongoose.set('strictQuery', false)
    mongoose.connect(process.env.DB_URL as string)
}

function configureServer(): void {
    const app: Application = express()
    app.use(cors())
    app.use(express.urlencoded({extended: true}))
    app.use(express.json())

    const mockRoutes = require('./routes/mock.routes')
    const mockFolderRoutes = require('./routes/mock_folder.routes')
    const allRoutes = require('./routes/all.routes')

    app.use('/all', allRoutes) // do not move this below '/' else it clashes with /:id
    app.use('/folder', mockFolderRoutes) // do not move this below '/' else it clashes with /:id
    app.use('/', mockRoutes)

    app.listen(process.env.PORT, (): void => {
        console.log(`Server running on port ${process.env.PORT}..`)
    })
}