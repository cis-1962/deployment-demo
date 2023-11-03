import express from 'express'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import boxRouter from './router'

dotenv.config()

const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors({ origin: 'http://localhost:5173' }))

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/test"
const PORT = Number(process.env.PORT) || 3000

mongoose.connect(MONGO_URI)

app.get('/api', (_req, res) => {
    res.send('Hello World!')
})

app.use('/api/boxes', boxRouter)

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "build")))
    app.get("*", (_req, res) => {
        res.sendFile(path.join(__dirname, "build/index.html"))
    })
}

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`)
})