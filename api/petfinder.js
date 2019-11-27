const express = require('express')
const router = express.Router()
const queries = require('../db/queries')
var request = require("request");
const axios = require('axios');
const querystring = require('querystring');
var rp = require('request-promise');
const fetch = require('node-fetch');
require('dotenv').config();

var apiToken = ''

//middleware function
function isValidId(request, response, next){
    if(!isNaN(request.params.id)) return next()
    next(new Error('Invalid ID'))
}

const retrieveToken = async() => {
    await axios.post('https://api.petfinder.com/v2/oauth2/token', 
        querystring.stringify({
            grant_type: 'client_credentials',
            client_id: process.env['CLIENT_ID'],
            client_secret: process.env['CLIENT_SECRET']
        }),
        {headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }}
    ).then(response => {
        process.env['TOKEN'] = response.data.access_token
        // console.log(process.env['TOKEN'])
    })
}

router.get('/', async(req, resp) => {
    await retrieveToken()
    resp.json(await getAnimals())
})

const getAnimals = async() => {
    const AuthStr = 'Bearer '.concat(process.env['TOKEN']); 
    
    const response = await axios.get('https://api.petfinder.com/v2/animals?type=dog&page=2', {
        headers: { Authorization: AuthStr}
    }).catch((error) => {
        console.log('error '+ error)
    })
    return response.data.animals
}


module.exports = router