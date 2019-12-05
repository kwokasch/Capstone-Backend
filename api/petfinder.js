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
    })
}

const getAnimals = async(url) => {
    const AuthStr = 'Bearer '.concat(process.env['TOKEN']); 
    
    const response = await axios.get(url, {
        headers: { Authorization: AuthStr}
    }).catch((error) => {
        console.log('error '+ error)
    })
    return response.data.animals
}

router.get('/', async(req, resp) => {
    await retrieveToken()
    resp.json(await getAnimals('https://api.petfinder.com/v2/animals?type=dog&page=2'))
})

router.post('/search', async(req, resp) => {
    const url = 'https://api.petfinder.com/v2/animals'
    
    const {name, species, gender, size, color, age, breed, location} = req.body;

    const nameParam = name ? `name=${name}` : '';
    const speciesParam = species ? `&type=${species}` : '';
    const genderParam = gender ? `&gender=${gender}` : '';
    const sizeParam = size ? `&size=${size}` : '';
    const colorParam = color ? `&color=${color}` : '';
    const ageParam = age ? `&age=${age}` : '';
    const breedParam = breed ? `&breed=${breed}` : '';
    const locationParam = location ? `&location=${location}` : '';
    const urlWithParams = `${url}?${nameParam}${speciesParam}${genderParam}${sizeParam}${colorParam}${ageParam}${breedParam}${locationParam}`

    await retrieveToken()
    resp.json(await getAnimals(urlWithParams))
})


module.exports = router