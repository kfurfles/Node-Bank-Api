import { ILaunch } from '../../core/typings/ILaunch';
export{}

const mongoose = require('mongoose')
    ,Schema = mongoose.Schema;
const LaunchSchema = new Schema({
    idUser: String,
    amount: Number,
    date: Date,
    launchList: []
},{
    id: true,
    timestamps: true
})

module.exports = mongoose.model('Launchs', LaunchSchema)