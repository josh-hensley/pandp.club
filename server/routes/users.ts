import { Router } from "express";
import User from "../models/User.js";
const router = Router()

router.get('/:username', async (req, res) => {
    const { username } = req.params
    const user = await User.find({ username });
    res.send(user)
})

router.put('/:username', async (req, res) => {
    const { username } = req.params;
    const data = req.body;
    const user = await User.updateOne({ username }, { ...data });
    res.send(user)
})

router.get('/', async (_req, res) => {
    const users = await User.find({});
    res.send(users)
})

router.delete('/:username', async (req, res) => {
    const { username } = req.params;
    const user = await User.deleteOne({ username })
    res.send(`User: ${username} deleted.`)
})

export default router