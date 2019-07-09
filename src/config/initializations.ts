const server = require('./server')
const db = require('./db')
const routes = require('./../controllers')

module.exports = () =>{
    const Server = new server()
    db.startConnection()

    Server.register((app)=>{
        app.use(routes())
    })

    Server.start()
    return Server
}