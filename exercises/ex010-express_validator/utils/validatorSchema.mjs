export const createUserSchema = {
    name: {
        isString: {
            errorMessage: "name must be a string"
        },
        notEmpty: {
            errorMessage: "name must cannnot be empty"
        },
        isLength: {
            options: {
                min: 3,
                max: 12
            },
            errorMessage: "name must be legth between 3-12 character"
        }
    },
    job: {
        isString: {
            errorMessage: "name must be a string"
        },
        notEmpty: true
    }
}