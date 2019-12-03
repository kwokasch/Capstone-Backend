const express = require('express')
const router = express.Router()
const queries = require('../db/queries')

function isValidId(request, response, next){
    if(!isNaN(request.params.id)) return next()
    next(new Error('Invalid ID'))
}

router.get('/:id', isValidId, (request, response) => {
    queries.getUser(request.params.id).then(user => {
        if(user){
            response.json(user)
        } else {
            delete user.password
            response.sendStatus(404)
        }
    })
})

router.post('/', (request, response) => {
    if(
        request.body.email &&
        request.body.password 
    ){
        queries.createUser(request.body).then(users => {
            response.json(users[0])
        })
    } else {
        response.json({error: "Missing information"})
    }
})

module.exports = router