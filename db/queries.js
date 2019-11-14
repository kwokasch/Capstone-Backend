//connection to db
const knex = require('./knex');

module.exports = {
    //User Methods
    getAllUsers(){
        return knex('users')
    },

    getUser(id){
        return knex('users').where('id', id).first()
    },

    createUser(user){
        return knex('users').insert(user, '*')
    },

    //Pet Methods
    getAllPets(){ 
        return knex('pets')
    },

    getOnePet(id){
        return knex('pets').where('id', id).first()
    },

    createPet(pet){
        return knex('pets').insert(pet, '*')
    }
}