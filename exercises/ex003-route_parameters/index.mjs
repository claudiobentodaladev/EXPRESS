import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

// fack database (mock)
const users = [
    { id: 1, name: "Claudio", age: 16 },
    { id: 2, name: "Paulo", age: 30 },
    { id: 3, name: "Dala", age: 55 },
    { id: 4, name: "nilza", age: 48 }
];

app.get("/", (request, response) => {
    response.send("Users API is on.");
});

// get user by id
app.get("/api/users/:id", (request, response) => {
    const id = Number(request.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return response.status(404).json({ error: "User not found" });
    }

    response.json(user);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});