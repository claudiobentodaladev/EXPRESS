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

//PATCH is used to update one or two out of data, instead of all data in json
//similar than PUT but not used to evry single data
app.patch('/api/users/:id', (request, response) => {
    const { body, params: { id } } = request
    const parsedId = parseInt(id)

    if (isNaN(parsedId)) {
        return response.sendStatus(400)
    }

    const indexUserFound = users.findIndex(user => user.id === parsedId)

    if (indexUserFound === -1) {
        return response.sendStatus(400)
    }

    users[indexUserFound] = { ...users[indexUserFound], ...body }
    return response.sendStatus(200)
})