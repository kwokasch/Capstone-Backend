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
            response.sendStatus(404)
            next()
        }
    })
})

router.post('/', (request, response) => {
    console.log('got post')
    console.log(request.body)
    if(
        request.body.firstName && 
        request.body.lastName && 
        request.body.phoneNumber && 
        request.body.email
        // request.body.password 
    ){
        queries.createUser(request.body).then(users => {
            return response.json(users[0])
        })
    } else {
        response.json({error: "Missing information"})
    }
})

module.exports = router