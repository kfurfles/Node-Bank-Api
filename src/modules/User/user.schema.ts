export{}
const mongoose = require('mongoose')
    ,Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: String,
    email: { type : String , unique : true },
    cpf: { type : String , unique : true },
    password: String,
    idAccount: String
},{
    timestamps: true
})

module.exports = mongoose.model('Users', UserSchema)

