//connection to db
const knex = require('./knex');
const bcrypt = require('bcrypt');

module.exports = {
    //User Methods
    async getAllUsers(){
        return await knex('users')
    },

    async getUser(id){
        return await knex('users').where('id', id).first()
    },

    async createUser(user){
        return await knex('users').insert(user, '*')
    },

    async findByEmail(email){
        user = await knex('users').where('email', email).first()
        return user
    },

    async findOrCreate(userProfile){
        const email = userProfile.email
        const user = await this.findByEmail(email)

        if (!user){
            await this.createUser(userProfile)
        } else {
            return user
        }
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