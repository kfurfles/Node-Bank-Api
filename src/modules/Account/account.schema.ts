export{}
const mongoose = require('mongoose')
    ,Schema = mongoose.Schema;
const UserSchema = new Schema({
    idUser: String,
    amount: Number
},{
    id: true,
    timestamps: true
})

module.exports = mongoose.model('Accounts', UserSchema)

