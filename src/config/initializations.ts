const server = require('./server')
const db = require('./db')

module.exports = () =>{
    const routes = require('./../controllers')
    const Server = new server()
    db.startConnection()

    Server.register((app)=>{
        app.use(routes(app));
        // routes(app)
    })

    Server.start()
    return Server
}