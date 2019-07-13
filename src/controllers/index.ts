const UserModule = require('../modules/User')
const AuthModule = require('../modules/Auth')
const TokenModule = require('../modules/Token')
const LaunchsModule = require('../modules/Launchs')

module.exports = (app) =>{
    const routes = [
        UserModule,
        LaunchsModule
    ]
    app.use('/', AuthModule)
    app.use(TokenModule)
    app.use('/api', ...routes)

    return routes
}
