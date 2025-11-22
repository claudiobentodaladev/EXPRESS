import express from "express";
const app = express();
const port = 3000;

const users = [
  { id: 1, name: "claudio", job: "developer" },
  { id: 2, name: "bento", job: "nurse" },
  { id: 3, name: "dala", job: "doctor" },
];

// Route GET to filter user
app.get("/api/users", (req, res) => {
  const { filter, value } = req.query;

  // Check if user is invalid
  if (!filter || !value) {
    return res.status(200).json(users);
  }

  if (!["name", "job"].includes(filter)) {
    return res.status(400).json({ error: "Invalid filter. Use 'name' or 'job'" });
  }

  // Filter users
  const filteredUsers = users.filter(user =>
    user[filter].toLowerCase() === value.toLowerCase()
  );

  res.json(filteredUsers);
});

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});