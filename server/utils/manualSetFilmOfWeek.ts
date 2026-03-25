import db from '../config/connection.js';
import { Film } from '../models/index.js'

const setFilmOfWeek = async ()=>{
    const movieId = process.argv[2];
    const selectedBy = process.argv[3];
    if(!movieId || !selectedBy){
        console.log('missing params!');
    }
    await Film.create({ movieId, selectedBy })
    process.exit(0)
}

await db();
await setFilmOfWeek()