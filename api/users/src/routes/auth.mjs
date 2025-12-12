import { Router } from "express";
import session from "express-session";
import mongoose from "mongoose";
import mongoStore from "connect-mongo";
import passport from "passport";
import { ensureAuth } from "../utils/middlewares.mjs";
import "../auth/local.stategies.mjs";

const router = Router();

router.use(session({
    secret: "helloC",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    },
    store: mongoStore.create({
        client: mongoose.connection.getClient()
    })
}));

router.use(passport.initialize());
router.use(passport.session());

router.get("/api/auth/", ensureAuth, (request, response) => {
    const { user } = request
    return response.status(200).json(user)
})

router.post("/api/auth", passport.authenticate("local"), (request, response) => {
    return response.sendStatus(200)
})

router.get("/api/auth/logout", ensureAuth, (request, response) => {
    request.logOut(err => {
        if (err) {
            return response.sendStatus(400)
        }
        return response.sendStatus(200)
    });
})


export default router;