const express = require('express')
const router = express.Router()
const queries = require('../db/queries')

function isValidId(request, response, next){
    if(!isNaN(request.params.id)) return next()
    next(new Error('Invalid ID'))
}

router.get('/', (request, response) => {
    queries.getAllUsers().then(users => {
        response.json(users)
    })
})

router.get('/:id', isValidId, (request, response) => {
    queries.getUser(request.params.id).then(user => {
        if(user){
            response.json(user)
        } else {
            response.status(404)
            next()
        }
    })
})

router.post('/', (request, response) => {
    queries.createUser(request.body).then(users => {
        return response.json(users[0])
    })
})

module.exports = router