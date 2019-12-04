require('dotenv').config()

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const bcrypt = require('bcrypt')
const knex = require('knex')
const config = require('.././knexfile')[process.env.NODE_ENV || "development"]
const database = knex(config)
const jwt = require('jsonwebtoken')

app.post('/users', (request, response) => {
    const { email, password } = request.body

    bcrypt.hash(password, 12).then(hashedPassword => {
        database('user')
            .insert({
                email,
                password: hashedPassword
            }).returning('*')
            .then(users => {
                response.status(201).json({...users[0]})
            })
    }) 
})  

app.post('/login', async (request, response) => {
    const { email, password } = request.body
    const foundUser = await database('user')
        .select()
        .where('email', email)
        .first()

    if(!foundUser){
        response.sendStatus(401)
    }

    const isPasswordMatch = await bcrypt.compare(password, foundUser.password_hash)
    if (!isPasswordMatch){
        response.sendStatus(401)
    } 

    const token = jwt.sign({
        id: foundUser.id,
        email: foundUser.email
    }, process.env.SECRET)

    response.json({ token })
})

app.get('/userprofile', authenticate, (request, response) => {
    response.json({
        secretInfo: "Here you go!"
    })
})

async function authenticate(request, response, next){
    const token = request.headers.authorization.split(" ")[1]

    if (!token) {
        response.sendStatus(401)
    } 

    let id

    try {
        id = jwt.verify(token, process.env.SECRET).id 
    } catch (error) {
        response.sendStatus(403)
    }

    const user = database('user')
        .select()
        .where('id', id)
        .first()

    request.user = user

    next()
}

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Listening on port ${port}`))