import { Router } from "express";
import userRoutes from "./users.js";
import authRoutes from "./auth.js";
import filmRoutes from "./films.js";
import tmdbRoutes from "./tmdb.js"

const router = Router()

router.use("/users", userRoutes)
router.use("/auth", authRoutes)
router.use("/films", filmRoutes)
router.use("/tmdb", tmdbRoutes)

export default router