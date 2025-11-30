import express from "express";
import cookieParser from "cookie-parser";
/*
cookie-parser is library that will allow to you parse your cookie to an object when you receive.
    -> Install:
        npm i cookie-parser
*/

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser('hellosecurity'))

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.get("/api/set-cookie", (request, response) => {

    response.cookie('language', 'en', {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: false,
        signed: true,
        path: '/'
    })

    response.status(201).send('Cookie was setted!')
});

app.get('/api/get-cookie', (request, response) => {

    if (["en", "fr", "pt"].includes(request.signedCookies.language)) {
        return response.status(200).json(request.signedCookies)
    }

    return response.status(400).json({ msg: "sorry, you need the correct cookie" })
});

app.get('/api/delete-cookie', (request, response) => {
    response.clearCookie('language', {
        path: '/'
    })
    response.status(200).send("Cookie was deleted!")
});