import express from "express";
import { validationResult, checkSchema, matchedData } from "express-validator";
import { createUserSchema } from "./utils/validatorSchema.mjs";

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const users = [
    { id: 1, name: "claudio", job: "developer" },
    { id: 2, name: "bento", job: "nurse" },
    { id: 3, name: "dala", job: "doctor" },
];

app.post('/api/users', checkSchema(createUserSchema), (request, response) => {

    const result = validationResult(request)
    if (!result.isEmpty()) {
        return response.status(400).send({ error: result.array() })
    }

    const data = matchedData(request)

    const newUser = { id: users[users.length - 1].id + 1, ...data }
    users.push(newUser)

    return response.status(201).json(newUser)
}
)