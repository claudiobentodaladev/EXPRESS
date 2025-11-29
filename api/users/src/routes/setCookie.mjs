import { Router } from "express";
import cookieParser from "cookie-parser";

const router = Router()

router.use(cookieParser('hellosecurity'))

router.get("/api/set-cookie", (request, response) => {

    response.cookie('language', 'en', {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: false,
        signed: true,
        path: '/'
    })

    response.status(201).send('Cookie was setted!')
});

export default router;