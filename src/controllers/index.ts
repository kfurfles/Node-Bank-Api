const UserModule = require('../modules/User')
const AuthModule = require('../modules/Auth')
const TokenModule = require('../modules/Token')

module.exports = (app) =>{
    const routes = [
        UserModule
    ]
    app.use('/', AuthModule)
    app.use(TokenModule)
    app.use('/api', ...routes)

    return routes
}
