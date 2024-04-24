import { load } from "https://deno.land/std@0.223.0/dotenv/mod.ts";
import express, { Application } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import mockRoutes from "./routes/mock.routes";
import mockFolderRoutes from "./routes/mock_folder.routes";

let env: any
configureEnv().then(function(_) {
    console.log(typeof _)
    env = _
    configureDb()
    configureServer()
})

async function configureEnv() {
    return await load();
}

function configureDb() {
    mongoose.set('strictQuery', false)
    mongoose.connect(env.DB_URL as string)
}

function configureServer(): void {
    const app: Application = express()
    app.use(cors())
    app.use(express.urlencoded({extended: true}))
    app.use(express.json())

    // const mockRoutes = require('./routes/mock.routes')
    // const mockFolderRoutes = require('./routes/mock_folder.routes')
    // const allRoutes = require('./routes/all.routes')

    app.use('/folder', mockFolderRoutes) // do not move this below '/' else it clashes with /:id
    app.use('/', mockRoutes)

    app.listen(env.PORT, (): void => {
        console.log(`Server running on port ${env.PORT}..`)
    })
}