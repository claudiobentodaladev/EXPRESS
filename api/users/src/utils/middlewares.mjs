export const ensureAuth = (request, response, next) => {
    if (!request.user) {
        return response.status(401).send("NOT AUTHENTICATED!")
    }
    next();
}