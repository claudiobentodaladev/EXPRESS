import { Router } from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { createUser, credetials, query } from "../utils/validationSchema.mjs";
import { handleID } from "../utils/middlewares.mjs";
import { users } from "../utils/constants.mjs";
import { User } from "../mongodb/schema/user.schema.mjs";
import { hashPassword } from "../auth/hashPassword.mjs";

const router = Router()

router.get('/api/users/:id', handleID, (request, response) => {
    const { parsedId } = request

    const filteredUsers = users.filter(user => user.id === parsedId)

    return response.status(200).json(filteredUsers)
})
router.get('/api/users', checkSchema(query), (request, response) => {

    const result = validationResult(request)

    if (!result.isEmpty()) {
        return response.status(400).json(result)
    }

    const { filter, value } = request.query;

    if (["name", "job"].includes(filter)) {
        const indexUserFound = users.findIndex(user => user[filter] === value)

        if (indexUserFound === -1) {
            return response.sendStatus(404)
        }

        const filteredUsers = users.filter(user => user[filter] === value)
        return response.status(200).json(filteredUsers)
    }

    return response.status(400).json(users)

}
)

router.post('/api/users', checkSchema(createUser), checkSchema(credetials), async (request, response) => {

    const result = validationResult(request)
    if (!result.isEmpty()) {
        return response.status(400).send({ error: result.array() })
    }

    const data = matchedData(request);
    data.password = hashPassword(data.password);
    try {
        const insertedUser = await new User(data).save()
        return response.status(201).json(insertedUser)

    } catch (err) {
        console.log(err)
        return response.sendStatus(400)
    }
})

router.put('/api/users/:id', handleID, (request, response) => {
    const { body, indexUserFound } = request

    users[indexUserFound] = { id: users[indexUserFound].id, ...body }

    return response.sendStatus(200)
})

router.patch('/api/users/:id', handleID, (request, response) => {
    const { body, indexUserFound } = request

    users[indexUserFound] = { ...users[indexUserFound], ...body }

    return response.sendStatus(200)
})

router.delete('/api/users/:id', handleID, (request, response) => {
    const { indexUserFound } = request

    users.splice(indexUserFound, 1)

    return response.sendStatus(200)
})

export default router;