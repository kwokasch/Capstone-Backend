//connection to db
const knex = require('./knex');

module.exports = {
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