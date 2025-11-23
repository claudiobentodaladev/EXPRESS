import express from "express";

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("server is running!")
})

const users = [
    { id: 1, name: "claudio", job: "developer" },
    { id: 2, name: "bento", job: "nurse" },
    { id: 3, name: "dala", job: "doctor" },
];

app.get('/api/users/:id', (req, res) => {
    const { params: { id } } = req

    const parsedId = parseInt(id)

    const indexUserFound = users.findIndex(user => user.id === parsedId)

    if (indexUserFound === -1) {
        return res.sendStatus(404)
    }

    const filteredUsers = users.filter(user => user.id === parsedId)

    return res.status(200).json(filteredUsers)
})
app.get('/api/users', (req, res) => {
    const { query: { filter, value } } = req

    if (!["name", "job"].includes(filter)) {
        return res.sendStatus(400)
    }

    const indexUserFound = users.findIndex(user => user[filter] === value)

    if (indexUserFound === -1) {
        return res.sendStatus(404)
    }

    const filteredUsers = users.filter(user => user[filter] === value)
    return res.status(200).json(filteredUsers)
})

app.post('/api/users', (req, res) => {
    const { body } = req

    const newUser = { id: users[users.length - 1].id + 1, ...body }
    users.push(newUser)

    return res.status(201).json(users)
})

app.put('/api/users/:id', (req, res) => {
    const { body, params: { id } } = req
    const parsedId = parseInt(id)

    if (isNaN(parsedId)) {
        return res.sendStatus(400)
    }

    const indexUserFound = users.findIndex(user => user.id === parsedId)

    if (indexUserFound === -1) {
        return res.sendStatus(400)
    }

    users[indexUserFound] = { id: parsedId, ...body }

    return res.sendStatus(200)
})

app.patch('/api/users/:id', (req, res) => {
    const { body, params: { id } } = req
    const parsedId = parseInt(id)

    if (isNaN(parsedId)) {
        return res.sendStatus(400)
    }

    const indexUserFound = users.findIndex(user => user.id === parsedId)

    if (indexUserFound === -1) {
        return res.sendStatus(400)
    }

    users[indexUserFound] = { ...users[indexUserFound], ...body }
    return res.sendStatus(200)
})

app.delete('/api/users/:id', (req, res) => {
    const { params: { id } } = req

    const parsedId = parseInt(id)

    if (isNaN(parsedId)) {
        return res.sendStatus(400)
    }

    const indexUserFound = users.findIndex(user => user.id === parsedId)

    if (indexUserFound === -1) {
        return res.sendStatus(400)
    }

    users.splice(indexUserFound, 1)
    return res.sendStatus(200)
})