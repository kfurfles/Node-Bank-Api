const authModule = () =>{
    const express = require('express');
    const routes = express.Router();
    const api = require('./auth.api')
    const apiUser = require('../User/user.api')
    
    routes.post('/login', api.authUser)
    routes.post('/signup', apiUser.create)
    return routes
}   

module.exports = authModule