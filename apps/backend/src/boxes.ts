import { Schema, model } from 'mongoose'

const boxSchema = new Schema({
    name: String
})

const Box = model('Box', boxSchema)

export default Box