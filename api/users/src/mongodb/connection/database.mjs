import { connect } from "mongoose";

connect("mongodb://localhost/users").then(data => {
    console.log(`Connected to database`)
}).catch(err => {
    console.log(err)
})