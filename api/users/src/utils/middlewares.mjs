import { users } from "../utils/constants.mjs";

export const handleID = (request, response, next) => {
    const { params: { id } } = request
    const parsedId = parseInt(id)

    if (isNaN(parsedId)) {
        return response.sendStatus(400)
    }

    const indexUserFound = users.findIndex(user => user.id === parsedId)

    if (indexUserFound === -1) {
        return response.sendStatus(404)
    }

    request.parsedId = parsedId;
    request.indexUserFound = indexUserFound;

    next();
}

export const ensureAuth = (request, response, next) => {
    if (!request.user) {
        return response.status(401).send("NOT AUTHENTICATED!")
    }
    next();
}