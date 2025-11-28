import express from "express";
import router from "./routes/indexRoutes.mjs";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.use((request, response, next) => {
    console.log(`Method: \"${request.method}\"; Url: \"${request.url}\"`);
    next();
});

app.get("/", (request, response) => {
    return response.send("API is working!");
});
