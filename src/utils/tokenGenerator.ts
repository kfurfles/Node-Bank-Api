export{}
const jwt = require('jsonwebtoken')

const tokenGenerator = (payload) => {
    return jwt.sign(payload, process.env.SECRET, { expiresIn: process.env.TOKEN_LIFE_TIME })
}

const tokenValidator = (token) => {
    if(!token) throw new Error('Token inválido!');
    return jwt.verify(token, process.env.SECRET)
}

module.exports = { tokenGenerator, tokenValidator }
