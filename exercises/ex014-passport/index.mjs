import express from "express";
import authRouter from "./routes/auth.mjs";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(authRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.get("/", (request, response) => {
    if (!request.session.visited) {
        request.session.visited = true;
    }

    return response.send("API is working!");
});