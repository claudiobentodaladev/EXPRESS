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

app.patch('/api/users/:id', (req, res) => {
    const { body, params: { id } } = req
    const parsedId = parseInt(id)

    if (isNaN(parsedId)) {
        return res.status(400)
    }

    const indexUserFound = users.findIndex(user => user.id === parsedId)

    if (indexUserFound === -1) {
        return res.sendStatus(400)
    }

    users[indexUserFound] = {...users[indexUserFound], ...body}
    return res.sendStatus(200)
})