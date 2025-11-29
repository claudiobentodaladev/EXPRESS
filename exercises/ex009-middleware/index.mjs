import express from "express";

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

/* MIDDLEWARE is function that receive data (request) and response, that can:
    -> Modify: request or response
    -> Finish a response: (ex.: response.send())
    -> Delegate the next middleware: next()
    -> Signal an error: next(err)
*/
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

    request.indexUserFound = indexUserFound;

    next();
}

const users = [
    { id: 1, name: "claudio", job: "developer" },
    { id: 2, name: "bento", job: "nurse" },
    { id: 3, name: "dala", job: "doctor" },
];

app.delete('/api/users/:id', handleID, (request, response) => {
    const { indexUserFound } = request

    users.splice(indexUserFound, 1)

    return response.sendStatus(200)
})