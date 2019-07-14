export{}
const jwt = require('jsonwebtoken')

const tokenGenerator = (payload) => {
    return jwt.sign(payload, process.env.SECRET, { expiresIn: 100000 })
}

const tokenValidator = (token) => {
    if(!token) throw new Error('Token inválido!');
    return jwt.verify(token, process.env.SECRET)
}

module.exports = { tokenGenerator, tokenValidator }
