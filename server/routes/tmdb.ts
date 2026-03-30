import { Router } from "express";

const router = Router();
const TMDB_BASE = process.env.TMDB_BASE
const TMDB_KEY = process.env.TMDB_KEY

router.get('/:id', async (req, res)=>{
    const { id } = req.params;
    try {
        const response = await fetch(`${TMDB_BASE}/movie/${id}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            authorization: `Bearer ${TMDB_KEY}`
        }
    });
    const movie = await response.json()
     res.send(movie)
        
    } catch (error: unknown) {
        console.error(error instanceof Error ? error.message : String(error))
    }
})

router.get('/', async (req, res)=>{
    const { query } = req.query;
    try {
        const response = await fetch(`${TMDB_BASE}/movie/${id}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            authorization: `Bearer ${TMDB_KEY}`
        }
    });
    const movie = await response.json()
     res.send(movie)
        
    } catch (error: unknown) {
        console.error(error instanceof Error ? error.message : String(error))
    }
})