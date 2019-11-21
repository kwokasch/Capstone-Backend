//connection to db
const knex = require('./knex');
const bcrypt = require('bcrypt');

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

    findOrCreate(user){
        if (!user){
            this.createUser(user)
        }
    }

    findByEmail(email){
        return knex('users').where('email', email).first()
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