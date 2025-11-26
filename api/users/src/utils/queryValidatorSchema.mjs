export const queryValidatorSchema = {
    filter: {
        isString: {
            errorMessage: "filter must be string"
        },
        notEmpty: {
            errorMessage: "filter must not be empty"
        },
        isLength: {
            options: {
                min: 3,
                max: 12
            },
            errorMessage: "must be legth between 3-12 character"
        }
    }
}