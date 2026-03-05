import express from 'express'
import path from 'path'
import db from './config/connection.js'
import { User } from './models/index.js'
import { authenticateToken, signToken } from './utils/auth.js'

const app = express()
await db()
const PORT = process.env.PORT || 3000

User.create({ username: 'Lmntreepenguin', password: 'Monday9167' })

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(import.meta.dirname, '../../client/dist')))

app.get('/user/:id', (req, res)=>{
    const { id } = req.params;
    res.send(`User - ${id}`)
})

app.get('/login', async (req, res)=>{
    const { username, password } = req.body;
    const user: any = User.findOne({ username });
    if (!user){
        console.error('User does not exist!')
    }
    const correctPassword = await user.isCorrectPassword(password)
    if (!correctPassword) {
        console.error('Incorrect Password!')
    }
    const token = signToken(user.username, user._id)
    res.send({ token, user })
})

app.post('/new', async (req, res) => {
    const input = req.body;
    const user: any = await User.create({...input});
    const token = signToken(user.username, user._id);
    res.send({ token, user }); 
})

app.put('/queue/:_id', async (req, res)=>{
    const { _id } = req.params;
    const { queue } = req.body;
    const user: any = await User.updateOne({ _id }, { queue })
    res.send({ message: 'Queue Updated', queue: user.queue })
})

app.get(/(.*)/, (_req, res) => {
  res.sendFile(path.join(import.meta.dirname, '../../client/dist', 'index.html'));
})

app.listen(PORT, async ()=>{
    console.log(`Listening on port: ${PORT}`)
})