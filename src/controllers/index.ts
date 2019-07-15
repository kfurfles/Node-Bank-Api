const UserModule = require('../modules/User')
const AuthModule = require('../modules/Auth')
const TokenModule = require('../modules/Token')
const LaunchsModule = require('../modules/Launchs')
const TransferModule = require('../modules/Transfer')

module.exports = (app) =>{
    const routes = [
        UserModule,
        LaunchsModule,
        TransferModule
    ]
    app.use('/', AuthModule)
    app.use(TokenModule)
    app.use('/api', ...routes)

    return routes
}
