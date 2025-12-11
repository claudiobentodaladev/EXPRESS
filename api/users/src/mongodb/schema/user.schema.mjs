import mongoose,{model as createCollection} from "mongoose";

const userSchema = new mongoose.Schema({
    name: mongoose.Schema.Types.String,
    job: mongoose.Schema.Types.String,
    username: {
        required: true,
        unique: true,
        type: mongoose.Schema.Types.String
    },
    email: {
        required: true,
        type: mongoose.Schema.Types.String
    },
    password: {
        required: true,
        type: mongoose.Schema.Types.String
    }
});

export const User = createCollection("user", userSchema);