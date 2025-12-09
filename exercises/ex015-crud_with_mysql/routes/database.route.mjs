import { Router } from "express";
import { createPool as connect } from "mysql2/promise";
import bodyParser from "body-parser";

const router = Router()

// database connection
const mysql = connect({
    host: "localhost",
    user: "root",
    password: "olamundo",
    database: "cadaster"
});

router.use(bodyParser.json())

// Read
router.get("/api/people", async (request, response) => {
    const [result] = await mysql.query("select * from people;").catch(err => {
        return response.sendStatus(400)
    });
    return response.status(200).json(result)
})

router.get("/api/people/:id", async (request, response) => {
    const { id } = request.params

    const [result] = await mysql.execute("select * from people where id = ?;", [id]).catch(err => {
        return response.sendStatus(400)
    });

    if (result.length === 0) {
        return response.sendStatus(404)
    }

    return response.status(200).json(result)

});

// Create
router.post("/api/people", async (request, response) => {
    const { name, job, bornDate, sex, weigth, heigth, nacionality, favorityCourse, description } = request.body;


    const [[[affectedRows]]] = (await mysql.execute("call peopleAddOrEdit(?,?,?,?,?,?,?,?,?,?);", [0, name, job, bornDate, sex, weigth, heigth, nacionality, favorityCourse, description])).concat(err => {
        return response.sendStatus(400)
    })

    return response.status(201).json(affectedRows)
})

// Update
router.put("/api/people/:id", async (request, response) => {
    const { id } = request.params;
    const { name, job, bornDate, sex, weigth, heigth, nacionality, favorityCourse, description } = request.body;

    if (id == 0) {
        return response.sendStatus(400)
    }
    const [[[{ affectedRows }]]] = (await mysql.execute("call peopleAddOrEdit(?,?,?,?,?,?,?,?,?,?);", [id, name, job, bornDate, sex, weigth, heigth, nacionality, favorityCourse, description])).concat(err => {
        return response.sendStatus(400)
    })

    if (affectedRows === 0) {
        return response.sendStatus(404)
    }

    return response.status(200).json({ affectedRows: affectedRows })
})

// Delete
router.delete("/api/people/:id", async (request, response) => {
    const { id } = request.params

    const [{ affectedRows }] = await mysql.execute("delete from people where id = ? limit 1;", [id]).catch(err => {
        return response.sendStatus(400)
    });

    console.log(affectedRows)

    if (affectedRows === 0) {
        return response.sendStatus(404)
    }

    return response.sendStatus(200)

});

export default router;