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