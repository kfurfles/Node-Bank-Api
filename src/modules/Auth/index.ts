export{}
const app = require('express')()

const authRoutes = require('./auth.controller')()

const routes = [
    authRoutes
]

app.use('/', ...routes)

module.exports = app

