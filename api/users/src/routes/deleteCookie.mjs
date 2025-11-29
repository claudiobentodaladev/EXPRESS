import { Router } from "express";

const router = Router()

router.get('/api/delete-cookie', (request, response) => {
    response.clearCookie('language', {
        path: '/'
    })
    response.status(200).send("Cookie was deleted!")
})

export default router;