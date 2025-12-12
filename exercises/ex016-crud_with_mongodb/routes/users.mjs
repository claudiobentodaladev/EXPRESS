import { Router } from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { createUser, credetials, query } from "../utils/validationSchema.mjs";
import { User } from "../mongodb/schema/user.schema.mjs";
import { hashPassword } from "../auth/hashPassword.mjs";

const router = Router()

// Read
router.get('/api/users', checkSchema(query), async (request, response) => {
    const result = validationResult(request)

    const { username } = request.query;
    if (!username) {
        const allUserFound = await User.find()
        return response.status(200).json(allUserFound)
    }

    if (!result.isEmpty()) {
        return response.status(400).json(result)
    }

    const oneUserFound = await User.findOne({ username: username })

    return response.status(400).json(oneUserFound)
})

// Create
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

// Update
router.put('/api/users', async (request, response) => {
    const { username } = request.query;

    const { modifiedCount } = await User.updateOne({ username: username }, request.body)

    if (modifiedCount == 0) {
        return response.sendStatus(404)
    }

    return response.sendStatus(200)
})
router.patch('/api/users', async (request, response) => {
    const { username } = request.query;

    const { modifiedCount } = await User.updateOne({ username: username }, request.body)

    if (modifiedCount == 0) {
        return response.sendStatus(404)
    }

    return response.sendStatus(200)
})

// Delete
router.delete('/api/users', async (request, response) => {
    const { username } = request.body;

    const { deletedCount } = await User.deleteOne({
        username: username
    })

    if (deletedCount == 0) {
        return response.status(404).send("NOT FOUND!")
    }

    return response.sendStatus(200)
})

export default router;