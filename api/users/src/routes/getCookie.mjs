import { Router } from "express";
import cookieParser from "cookie-parser";

const router = Router()
router.use(cookieParser())

router.get('/api/get-cookie', (request, response) => {

    if (["en", "fr", "pt"].includes(request.signedCookies.language)) {
        return response.status(200).json(request.signedCookies)
    }

    return response.status(400).json({ msg: "sorry, you need the correct cookie" })
})

export default router;