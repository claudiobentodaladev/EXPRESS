import { Router } from "express";
import user from "./users.mjs";

const router = Router()

router.use(user);

export default router;