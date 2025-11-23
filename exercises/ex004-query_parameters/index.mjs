import express from "express";
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});

const users = [
  { id: 1, name: "claudio", job: "developer" },
  { id: 2, name: "bento", job: "nurse" },
  { id: 3, name: "dala", job: "doctor" },
];

// Route GET to filter user
app.get("/api/users", (request, response) => {
  const { query: { filter, value } } = request

    if (!["name", "job"].includes(filter)) {
        return response.sendStatus(400)
    }

    const indexUserFound = users.findIndex(user => user[filter] === value)

    if (indexUserFound === -1) {
        return response.sendStatus(404)
    }

    const filteredUsers = users.filter(user => user[filter] === value)
    return response.status(200).json(filteredUsers)
});