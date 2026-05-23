import { Router } from "express"
import { home, marco, abc } from "../controllers/index.controllers.js"

const router = Router()

router.get("/", home)
router.get("/marco", marco)
router.get("/a/b/c", abc)

export default router
