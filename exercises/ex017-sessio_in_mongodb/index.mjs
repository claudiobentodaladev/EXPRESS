import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import mongoStore from "connect-mongo";

const app = express();
const PORT = process.env.PORT || 3000;

router.use(session({
    secret: "helloC",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    },
    // START
    store: mongoStore.create({
        client: mongoose.connection.getClient() // <- to store session into mongodb database connected
    })
    // END
}));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/', (request, response) => {
    return response.status(200).send("API is working!")
});