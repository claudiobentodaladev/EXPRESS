import { Router } from "express";
import { users } from "../utils/constants.mjs";

//router is used like app in the root
const router = Router()

router.get('/api/users/', (request, response) => {
    return response.status(200).json(users)
})

export default router;