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

//DELETE is used to delete data
app.delete('/api/users/:id', (request, response) => {
    const { params: { id } } = request

    const parsedId = parseInt(id)

    if (isNaN(parsedId)) {
        return response.sendStatus(400)
    }

    const indexUserFound = users.findIndex(user => user.id === parsedId)

    if (indexUserFound === -1) {
        return response.sendStatus(400)
    }

    users.splice(indexUserFound, 1)
    return response.sendStatus(200)
})