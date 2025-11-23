import express from "express";

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

app.put('/api/users/:id', (request, response) => {
   const { params: { id } } = request

    const parsedId = parseInt(id)

    const indexUserFound = users.findIndex(user => user.id === parsedId)

    if (indexUserFound === -1) {
        return response.sendStatus(404)
    }

    const filteredUsers = users.filter(user => user.id === parsedId)

    return response.status(200).json(filteredUsers)
})