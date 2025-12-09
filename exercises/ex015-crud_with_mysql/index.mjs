import express from "express";
import databaseRoute from "./routes/database.route.mjs";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(databaseRoute);

app.get("/", (request, response) => {
    return response.send("API is working!");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});