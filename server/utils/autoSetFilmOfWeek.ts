import User from '../models/User.js';
import Film from '../models/Films.js';

const setFilmOfWeek = async () => {
    const currentDate = new Date();
    const getISOWeek = (date: Date) => {
        const d = new Date(date.getTime());
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
        const week1 = new Date(d.getFullYear(), 0, 4);
        return 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
    }
    const week = getISOWeek(currentDate);
    const users = await User.find({});
    const user = users[week % users.length];
    await Film.create({
        movieId: user?.queue ? user.queue[0] : 0,
        selectedBy: user?.username,
    });
}

export default setFilmOfWeek