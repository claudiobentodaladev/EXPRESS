# 🧭 Express.js Learning Journey

This repository documents my journey learning **Express.js**, the most popular Node.js framework for building APIs and web applications.  
The goal is to register study notes, best practices, examples, and small projects, so others can learn following the same path.

---

## 🚀 What is Express.js?

Express.js is a minimalist framework for building web servers in Node.js.  
It helps with:

- Creating simple and complex routes
- Working with middleware
- Integrating databases
- Building complete REST APIs
- Serving static and dynamic content

---

## 📦 Getting Started

### 1️⃣ Install Node.js

Check if Node is installed:

```bash
node -v
````

If not installed, download it from the official Node.js website.

---

### 2️⃣ Initialize the project

```bash
mkdir my-express-project
cd my-express-project
npm init -y
```

---

## 🧰 Installing Essential Libraries

### Express

```bash
npm install express
```

### Nodemon (optional but extremely useful during development)

```bash
npm install --save-dev nodemon
```

Add this to `package.json`:

```json
"scripts": {
  "dev": "nodemon index.js"
}
```

### CORS (to allow external API access)

```bash
npm install cors
```

Usage:

```js
const cors = require("cors");
app.use(cors());
```

### Dotenv (to handle environment variables)

```bash
npm install dotenv
```

Usage:

```js
require("dotenv").config();
```

---

## 📁 Basic Project Structure

A simple structure:

```
📂 my-express-project
 ├─ index.js
 ├─ package.json
 ├─ /routes
 ├─ /controllers
 ├─ /middlewares
```

Basic server in `index.js`:

```js
const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

---

## 🔥 Thunder Client — Testing API Routes in VS Code

To test routes directly inside VS Code, there is the **Thunder Client** extension.

It allows you to:

* Send HTTP requests (GET, POST, PUT, DELETE…)
* Save request collections
* Work like Postman but inside the editor

### How to install

1. Open **VS Code**
2. Go to **Extensions**
3. Search for `Thunder Client`
4. Install

Then open the sidebar icon and start testing your API.

---

## 💡 Topics Studied in This Repository

* Routes (Route Parameters and Query Parameters)
* Middleware usage
* HTTP Status Codes
* REST API structure
* Essential libraries
* Database integration (coming soon)

Each directory and file represents a step forward in learning.

---

## 🎯 Goal

Build professional and functional APIs with Express.js while documenting the learning journey so others can follow the same path.

---

## 🛠 Requirements

* Node.js installed
* VS Code recommended
* Thunder Client optional for fast API testing

---

## 🌍 Contributions

Suggestions and improvements are welcome.
Sharing knowledge helps the entire community grow.

---

## 📜 License

This repository is free for study and learning.

```
```
