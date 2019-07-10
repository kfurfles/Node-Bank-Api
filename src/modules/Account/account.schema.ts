export{}
const mongoose = require('mongoose')
    ,Schema = mongoose.Schema;
const UserSchema = new Schema({
    idUser: String,
    numberAccount: String,
    amount: Number
},{
    timestamps: true
})

module.exports = mongoose.model('Accounts', UserSchema)

