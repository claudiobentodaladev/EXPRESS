import { Router } from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { createUser, query } from "../utils/validationSchema.mjs";
import { handleID } from "../utils/middlewares.mjs";
import { users } from "../utils/constants.mjs";

const router = Router()

router.get('/api/users/:id', handleID, (request, response) => {
    const { parsedId } = request

    const filteredUsers = users.filter(user => user.id === parsedId)

    return response.status(200).json(filteredUsers)
})
router.get('/api/users', checkSchema(query),
    (request, response) => {

        const result = validationResult(request)

        if (!result.isEmpty()) {
            return response.status(400).json(result)
        }

        const { query: { filter, value } } = request

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

router.post('/api/users', checkSchema(createUser), (request, response) => {

    const result = validationResult(request)
    if (!result.isEmpty()) {
        return response.status(400).send({ error: result.array() })
    }

    const data = matchedData(request)

    const newUser = { id: users[users.length - 1].id + 1, ...data }
    users.push(newUser)

    return response.status(201).json(newUser)
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