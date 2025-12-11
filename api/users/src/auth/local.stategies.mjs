import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../mongodb/schema/user.schema.mjs";

passport.serializeUser((user, done) => {
    console.log(`Inside of serialize user! | ${user}`)
    console.log(user)
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    console.log(`Inside of deserialize user! | user ID: ${id}`)
    try {
        const foundUser = await User.findById(id)
        if (!foundUser) {
            throw new Error("User not found!");
        }
        done(null, foundUser)
    } catch (err) {
        done(err)
    }
})

export default passport.use(
    new Strategy(async (username, password, done) => {
        console.log(`Username: ${username} | Passord: ${password}`)
        try {
            const foundUser = await User.findOne({username: username})

            if (!foundUser) {
                throw new Error("user not found!");
            }

            if (foundUser.password !== password) {
                throw new Error("password is wrong!");
            }

            done(null, foundUser);
        } catch (err) {
            done(null, null);
        }

    })
);