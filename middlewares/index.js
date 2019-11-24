const { verify } = require('../auth/utils')

// will grab auth header from req and verify it
async function checkAuthHeaderSetUser(req, res, next){
    const authorization = req.get('authorization')
    if(authorization) {
        const token = authorization.split(' ')[1]
        try {
            const user = await verify(token)
            req.user = user
        } catch(error) {
            console.log(error)
        }
    }
    next()
}

async function checkAuthHeaderSetUserUnAuthorized(req, res, next){
    const authorization = req.get('authorization')
    if(authorization) {
        const token = authorization.split(' ')[1]
        try {
            const user = await verify(token)
            req.user = user
            return next()
        } catch (error) {
            console.log(error)
        }
    }
    res.status(401)
    next(new Error('un-authorized'))
}

module.exports = {
    checkAuthHeaderSetUser,
    checkAuthHeaderSetUserUnAuthorized
}