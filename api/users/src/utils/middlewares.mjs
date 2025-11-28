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