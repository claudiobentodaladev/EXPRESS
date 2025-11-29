import { Router } from "express";
import user from "./users.mjs";
import setCookie from "./setCookie.mjs";
import getCookie from "./getCookie.mjs";
import deleteCookie from "./deleteCookie.mjs";

const router = Router()

router.use(user);
router.use(setCookie)
router.use(getCookie)
router.use(deleteCookie)

export default router;