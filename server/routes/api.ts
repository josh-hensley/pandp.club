import { Router } from "express";
import userRoutes from "./users.js";
import authRoutes from "./auth.js";
import filmRoutes from "./films.js";

const router = Router()

router.use("/users", userRoutes)
router.use("/auth", authRoutes)
router.use("/films", filmRoutes)

export default router