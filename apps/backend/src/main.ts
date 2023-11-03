import express from 'express'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import boxRouter from './router'

dotenv.config()

const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors({ origin: 'http://localhost:5173' }))

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/test"
const PORT = process.env.PORT || 3000

mongoose.connect(MONGO_URI)

app.get('/api', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/boxes', boxRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})