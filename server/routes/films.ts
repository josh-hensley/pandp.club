import { Router } from "express";
import Film from "../models/Films.js";

const router = Router()

router.get('/', async (_req, res) => {
    const films = await Film.find({});
    res.send(films)
})

router.delete('/:id', async (req, res) => {
    const film = await Film.findByIdAndDelete(req.params.id);
    res.send(`Deleted: ${film}`)
})

router.get('/current', async (_req, res) => {
    const films = await Film.find({});
    res.send(films[films.length - 1]);
})

export default router