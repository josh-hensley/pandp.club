import express from 'express'
import path from 'path'
import db from './config/connection.js'
import { User } from './models/index.js'
import { authenticateToken, signToken } from './utils/auth.js'

const app = express()
await db()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(import.meta.dirname, '../../client/dist')))

app.post('/api/user/:username', async (req, res)=>{
    const { username } = req.params;
    const data = req.body;
    const user = await User.updateOne({ username }, { ...data });
    res.send(user)
})

app.get('/api/users', async (_req,res)=>{
    const users = await User.find({});
    res.send(users)
})

app.delete('/api/user/:username', async (req, res)=>{
    const { username } = req.params;
    const user = await User.deleteOne({ username })
    res.send(`User: ${username} deleted.`)
})

app.post('/api/login', async (req, res)=>{
    const { username, password } = req.body;
    const user: any = await User.findOne({ username });
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

app.post('/api/new', async (req, res) => {
    const input = req.body;
    const user: any = await User.create({...input});
    const token = signToken(user.username, user._id);
    res.send({ token, user }); 
})

app.get(/(.*)/, (_req, res) => {
  res.sendFile(path.join(import.meta.dirname, '../../client/dist', 'index.html'));
})

app.listen(PORT, async ()=>{
    console.log(`Listening on port: ${PORT}`)
})