import express from "express";

const app = express()
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('hi')
})

app.get('/', (request, response) => {
    response.json({
        message: 'hello, world!!!'
    })
})

// app.get() is used to get data from api
app.get('/api/users', (request, response) => {
    response.json([
        {
            id: 1,
            username: 'claudio14',
            display_name: 'Claudio Dala',
            job: 'programmer'
        },
        {
            id: 2,
            username: 'bento4',
            display_name: 'Bento',
            job: 'teacher'
        },
        {
            id: 3,
            username: 'dala33',
            display_name: 'Dala',
            job: 'doctor'
        }
    ])
})