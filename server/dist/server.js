import express from 'express';
import path from 'path';
import db from './config/connection.js';
import { User, Film } from './models/index.js';
import cron from 'node-cron';
import { signToken } from './utils/auth.js';
const app = express();
await db();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(import.meta.dirname, '../../client/dist')));
const setFilmOfWeek = async () => {
    const currentDate = new Date();
    const getISOWeek = (date) => {
        const d = new Date(date.getTime());
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
        const week1 = new Date(d.getFullYear(), 0, 4);
        return 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
    };
    const week = getISOWeek(currentDate);
    const users = await User.find({});
    const user = users[week % users.length];
    await Film.create({
        movieId: user?.queue ? user.queue[0] : 0,
        selectedBy: user?.username,
    });
};
cron.schedule('0 7 * * 1', setFilmOfWeek);
app.get('/api/user/:username', async (req, res) => {
    const { username } = req.params;
    const user = await User.find({ username });
    res.send(user);
});
app.put('/api/user/:username', async (req, res) => {
    const { username } = req.params;
    const data = req.body;
    const user = await User.updateOne({ username }, { ...data });
    res.send(user);
});
app.get('/api/users', async (_req, res) => {
    const users = await User.find({});
    res.send(users);
});
app.delete('/api/user/:username', async (req, res) => {
    const { username } = req.params;
    const user = await User.deleteOne({ username });
    res.send(`User: ${username} deleted.`);
});
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        console.error('User does not exist!');
    }
    const correctPassword = await user.isCorrectPassword(password);
    if (!correctPassword) {
        console.error('Incorrect Password!');
    }
    const token = signToken(user.username, user._id);
    res.send({ token });
});
app.post('/api/new', async (req, res) => {
    const input = req.body;
    const user = await User.create({ ...input });
    const token = signToken(user.username, user._id);
    res.send({ token, user });
});
app.get('/api/films', async (_req, res) => {
    const films = await Film.find({});
    res.send(films);
});
app.get('/api/filmOfWeek', async (_req, res) => {
    const films = await Film.find({});
    res.send(films[films.length - 1]);
});
app.get(/(.*)/, (_req, res) => {
    res.sendFile(path.join(import.meta.dirname, '../../client/dist', 'index.html'));
});
app.listen(PORT, async () => {
    console.log(`Listening on port: ${PORT}`);
});
//# sourceMappingURL=server.js.map