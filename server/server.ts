import express from 'express'
import path from 'path'
import db from './config/connection.js'
import { User, Film } from './models/index.js'
import cron from 'node-cron'
import apiRoutes from './routes/api.js'
import setFilmOfWeek from './utils/autoSetFilmOfWeek.js'

const app = express()
await db()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(import.meta.dirname, '../../client/dist')))
app.use("/api", apiRoutes)

cron.schedule('0 7 * * 1', setFilmOfWeek)

app.get(/(.*)/, (_req, res) => {
    res.sendFile(path.join(import.meta.dirname, '../../client/dist', 'index.html'));
})

app.listen(PORT, async () => {
    console.log(`Listening on port: ${PORT}`)
})