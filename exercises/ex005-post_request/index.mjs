import express from "express";

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000

const users = [
  { id: 1, name: "claudio", job: "developer" },
  { id: 2, name: "bento", job: "nurse" },
  { id: 3, name: "dala", job: "doctor" },
];

app.post('/api/users', (req,res) => {
    // POST REQUEST received by: req.body
    const {body} = req
    const newUser = { id: users[users.length - 1].id + 1,...body}
    users.push(newUser)
    return res.status(200).json(users)
})

app.listen(PORT, () => {
    console.log("server is running!")
})