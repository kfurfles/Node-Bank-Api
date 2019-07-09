const Express = require('express')
const router = new Express.Router()
module.exports = () =>{
    router.get('/',(req,res) =>{
        res.send('Hello Word1')
    })
    return router
}