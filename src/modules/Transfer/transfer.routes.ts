module.exports = function (){
    const app = require('express')()
    
    const userRoutes = require('./transfer.controller')
    
    const routes = [
        userRoutes
    ]
    
    app.use('/user', ...routes)
    return app
}