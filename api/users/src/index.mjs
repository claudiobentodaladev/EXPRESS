import express from "express";
import { query, validationResult, checkSchema, matchedData } from "express-validator";
import { createUserSchema } from "./utils/createUserValidatorSchema.mjs";
import { queryValidatorSchema } from "./utils/queryValidatorSchema.mjs";

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.use((request, response, next) => {
    console.log(`Method: \"${request.method}\"; Url: \"${request.url}\"`);
    next();
})

const handleID = (request, response, next) => {
    const { params: { id } } = request
    const parsedId = parseInt(id)

    if (isNaN(parsedId)) {
        return response.sendStatus(400)
    }

    const indexUserFound = users.findIndex(user => user.id === parsedId)

    if (indexUserFound === -1) {
        return response.sendStatus(404)
    }

    request.parsedId = parsedId;
    request.indexUserFound = indexUserFound;

    next();
}

const users = [
    { id: 1, name: "claudio", job: "developer" },
    { id: 2, name: "bento", job: "nurse" },
    { id: 3, name: "dala", job: "doctor" },
];

app.get('/', (request, response) => {
    return response.send("API is working!")
})

app.get('/api/users/:id', handleID, (request, response) => {
    const { parsedId } = request

    const filteredUsers = users.filter(user => user.id === parsedId)

    return response.status(200).json(filteredUsers)
})
app.get('/api/users', checkSchema(queryValidatorSchema),
    (request, response) => {
        const { query: { filter, value } } = request
        console.log(validationResult(request))

        if (["name", "job"].includes(filter)) {
            const indexUserFound = users.findIndex(user => user[filter] === value)

            if (indexUserFound === -1) {
                return response.sendStatus(404)
            }

            const filteredUsers = users.filter(user => user[filter] === value)
            return response.status(200).json(filteredUsers)
        }

        return response.status(400).json(users)

    })

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

app.put('/api/users/:id', handleID, (request, response) => {
    const { body, indexUserFound } = request

    users[indexUserFound] = { id: users[indexUserFound].id, ...body }

    return response.sendStatus(200)
})

app.patch('/api/users/:id', handleID, (request, response) => {
    const { body, indexUserFound } = request

    users[indexUserFound] = { ...users[indexUserFound], ...body }

    return response.sendStatus(200)
})

app.delete('/api/users/:id', handleID, (request, response) => {
    const { indexUserFound } = request

    users.splice(indexUserFound, 1)

    return response.sendStatus(200)
})