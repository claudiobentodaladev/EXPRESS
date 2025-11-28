import express from "express";
import userRouter from "./routes/users.mjs";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});