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

app.post('/api/users', (request,response) => {

    // POST REQUEST received by: request.body
    const {body} = request

    const newUser = { id: users[users.length - 1].id + 1,...body}
    users.push(newUser)
    
    return response.status(200).json(users)
})