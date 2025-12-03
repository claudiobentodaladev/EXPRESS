import { Router } from "express";
import user from "./users.mjs";
import auth from "./auth.mjs";

const router = Router()

router.use(user);
router.use(auth)

export default router;