const express = require('express')
const router = express.Router()
const queries = require('../db/queries')
var request = require("request");
var rp = require('request-promise');
const fetch = require('node-fetch');
require('dotenv').config();

var apiToken = ''

//middleware function
function isValidId(request, response, next){
    if(!isNaN(request.params.id)) return next()
    next(new Error('Invalid ID'))
}

// request.post('https://api.petfinder.com/v2/oauth2/token', {
//     form: {
//         grant_type: 'client_credentials',
//         client_id: process.env['CLIENT_ID'],
//         client_secret: process.env['CLIENT_SECRET']
//     },
//     json: true
// }, function (error, response, body) {
//     if (error) throw new Error(error);
    
//     const responseBody = response['body']
//     const parsedResponse = JSON.parse(responseBody)
//     const token = parsedResponse["access_token"]
    
//     process.env['TOKEN'] = token
//     apiToken = process.env['TOKEN']
//     console.log('TOKEN', typeof(apiToken))
//     newToken = apiToken
//     // return apiToken
// }

// )
    const options = {
        method: 'POST',
        url: 'https://api.petfinder.com/v2/oauth2/token',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        form: {
            grant_type: 'client_credentials',
            client_id: process.env['CLIENT_ID'],
            client_secret: process.env['CLIENT_SECRET']
        }
    };
        
    async function getToken (error, response, body) {
        if (error) throw new Error(error);
        const responseBody = await response['body']
        const parsedResponse = await JSON.parse(responseBody)
        return process.env['TOKEN'] = await parsedResponse["access_token"]
    }

request(options, getToken)

router.get('/', (req, resp) => {
    resp.json({token: process.env['TOKEN']})
})

//   const getAnimals = () => {
//       fetch('https://api.petfinder.com/v2/animals?type=dog&page=2', {
//           method: 'GET',
//           headers: {
//               'content-type': 'application/json',
//               'authorization': `Bearer ${process.env['TOKEN']}`
//           }
//       }).then(response => response.json())
//       .then(console.log)
//   }
// //   getAnimals()

module.exports = router


