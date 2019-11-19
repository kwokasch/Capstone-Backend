const express = require('express')
const router = express.Router()
const queries = require('../db/queries')

//middleware function
function isValidId(request, response, next){
    if(!isNaN(request.params.id)) return next()
    next(new Error('Invalid ID'))
}

router.get('/', (request, response) => {
    queries.getAllPets().then(pets => {
        response.json(pets)
    })
})

router.get('/:id', isValidId, (request, response) => {
    queries.getOnePet(request.params.id).then(pet => {
        if(pet){
            response.json(pet)
        } else {
            response.status(404)
            next()
        }
    })
})

router.post('/', (request, response) => {
    console.log(request.body)
    queries.createPet(request.body).then(pets => {
        return response.json(pets[0])
    })
})

module.exports = router