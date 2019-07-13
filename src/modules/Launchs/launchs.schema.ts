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

// var f = [
//     {
//         idUser: 1,
//         amount: 0,
//         date: "10-10-2010",
//         launchList: [
//             name: "conta de luz",
//             type: "debit",
//             value: "2000.00",
//         ]
//     }
// ]
