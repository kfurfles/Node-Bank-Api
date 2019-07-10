export{}
const app = require('express')()
const api = require('./token.api')

app.use('/api/*', api.tokenChecker)

module.exports = app