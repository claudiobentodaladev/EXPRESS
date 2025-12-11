export const createUser = {
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
        }
    },
    username: {
        isString: {
            errorMessage: "name must be a string"
        },
        notEmpty: true
    }
}

export const credetials = {
    email: {
        isString: {
            errorMessage: "filter must be string"
        },
        notEmpty: {
            errorMessage: "filter must not be empty"
        },
        isEmail: {
            errorMessage: "must be a validate email adress"
        }
    },
    password: {
        isString: {
            errorMessage: "filter must be string"
        },
        notEmpty: {
            errorMessage: "filter must not be empty"
        },
        isLength: {
            options: {
                min: 3
            },
            errorMessage: `must be legth min 3`
        }
    }
}

export const query = {
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