// require('dotenv').config()

// const express = require('express')
// const app = express()

// const bodyParser = require('body-parser')
// app.use(bodyParser.json())

// const bcrypt = require('bcrypt')
// const knex = require('knex')
// const config = require('./knexfile')[process.env.NODE_ENV || "development"]
// const database = knex(config)
// const jwt = require('jsonwebtoken')

// app.post('/users', (request, response) => {
//     const { email, password } = request.body

//     bcrypt.hash(password, 12).then(hashedPassword => {
//         database('user')
//             .insert({
//                 email,
//                 password: hashedPassword
//             }).returning('*')
//             .then(users => {
//                 response.status(201).json({...users[0]})
//             })
//     }) 
// })  

// app.post('/login', async (request, response) => {
//     const { email, password } = request.body
//     const foundUser = await database('user')
//         .select()
//         .where('email', email)
//         .first()

//     if(!foundUser){
//         response.sendStatus(401)
//     }

//     const token = jwt.sign({
//         id: foundUser.id,
//         email: foundUser.email
//     }, process.env.SECRET)
// })

// app.listen(process.env.port || 3000, () => console.log('Listening'))