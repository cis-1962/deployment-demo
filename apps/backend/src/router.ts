import { Router, RequestHandler } from 'express'
import Box from './boxes'

const boxRouter = Router()

boxRouter.get('/', async (_req, res) => {
    const boxes = await Box.find()
    res.json(boxes)
})

interface PostBody {
    name?: string
}

boxRouter.post('/', async (req, res) => {
    const { name } = req.body as PostBody
    if (!name) {
        res.status(400).json({ error: 'name is required' })
        return
    }

    const box = new Box({ name })
    await box.save()
    res.json(box)
})

boxRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
    await Box.findByIdAndDelete(id)
    res.sendStatus(204)
})

export default boxRouter