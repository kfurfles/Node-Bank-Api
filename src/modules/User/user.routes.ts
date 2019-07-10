const app = require('express')()

const userRoutes = require('./user.controller')

const routes = [
    userRoutes
]

app.use('/user', ...routes)

module.exports = app