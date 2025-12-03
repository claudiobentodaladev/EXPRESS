import { Router } from "express";
import session from "express-session";
import { users } from "../utils/constants.mjs";

const router = Router();

router.use(session({
    secret: "helloC",
    saveUninitialized: false, // boolean: empty session(no data) must be saved in the server
    resave: false, // boolean: session will be saved again in the server even if there's no modifications
    cookie: { // cookie sets
        maxAge: 1000 * 60 * 60
    }
}))

router.post("/api/auth", (request, response) => {
    const { email, password } = request.body;

    const foundUser = users.find(user => user.email === email)

    if (!foundUser || foundUser.password != password) {
        return response.status(401).json({ msg: "BAD CREDENTIAL!" })
    }

    request.session.user = foundUser;

    return response.status(200).json(foundUser)
})

router.get("/api/auth/status", (request, response) => {
    if (!request.session.user) {
        return response.status(401).json({ msg: "NOT AUTHENTICATED" })
    }

    request.sessionStore.get(request.session.id, (err, sessionData) => {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log(sessionData)
    })

    return response.status(200).json(request.session.user)
})

export default router;