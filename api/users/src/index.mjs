import express from "express";

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.use((req, res, next) => {
    console.log(`Method: \"${req.method}\"; Url: \"${req.url}\"`);
    next();
})

const handleID = (req, res, next) => {
    const { params: { id } } = req
    const parsedId = parseInt(id)

    if (isNaN(parsedId)) {
        return res.sendStatus(400)
    }

    const indexUserFound = users.findIndex(user => user.id === parsedId)

    if (indexUserFound === -1) {
        return res.sendStatus(404)
    }

    req.parsedId = parsedId;
    req.indexUserFound = indexUserFound;

    next();
}

const users = [
    { id: 1, name: "claudio", job: "developer" },
    { id: 2, name: "bento", job: "nurse" },
    { id: 3, name: "dala", job: "doctor" },
];

app.get('/', (req, res) => {
    return res.send("API is working!")
})

app.get('/api/users/:id', handleID,(req, res) => {
    const { parsedId } = req

    const filteredUsers = users.filter(user => user.id === parsedId)

    return res.status(200).json(filteredUsers)
})
app.get('/api/users',(req, res) => {
    const { query: { filter, value } } = req

    if (["name", "job"].includes(filter)) {
        const indexUserFound = users.findIndex(user => user[filter] === value)

        if (indexUserFound === -1) {
            return res.sendStatus(404)
        }

        const filteredUsers = users.filter(user => user[filter] === value)
        return res.status(200).json(filteredUsers)
    }

    return res.status(202).json(users)

})

app.post('/api/users', (req, res) => {
    const { body } = req

    const newUser = { id: users[users.length - 1].id + 1, ...body }
    users.push(newUser)

    return res.status(201).json(users)
})

app.put('/api/users/:id', handleID, (req, res) => {
    const { body, indexUserFound } = req

    users[indexUserFound] = { id: users[indexUserFound].id, ...body }

    return res.sendStatus(200)
})

app.patch('/api/users/:id', handleID, (req, res) => {
    const { body, indexUserFound } = req

    users[indexUserFound] = { ...users[indexUserFound], ...body }

    return res.sendStatus(200)
})

app.delete('/api/users/:id', handleID, (req, res) => {
    const { indexUserFound } = req

    users.splice(indexUserFound, 1)

    return res.sendStatus(200)
})