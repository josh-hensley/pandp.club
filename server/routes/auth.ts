import { Router } from "express";
import User from "../models/User.js";
import { signToken } from "../utils/auth.js";

const router = Router()

router.put('/login', async (req, res) => {
    const { username, password } = req.body;
    const user: any = await User.findOne({ username });
    if (!user) {
        console.error('User does not exist!')
    }
    const correctPassword = await user.isCorrectPassword(password)
    if (!correctPassword) {
        console.error('Incorrect Password!')
    }
    const token = signToken(user.username, user._id)
    res.send({ token })
})

router.post('/new', async (req, res) => {
    const input = req.body;
    const user: any = await User.create({ ...input });
    const token = signToken(user.username, user._id);
    res.send({ token, user });
})

export default router