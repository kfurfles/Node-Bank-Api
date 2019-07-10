export{}
const mongoose = require('mongoose')
    ,Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: String,
    email: String,
    cpf: String,
    password: String
},{
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema)

