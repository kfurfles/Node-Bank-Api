const mongoose = require('mongoose')
const { connection } = mongoose
module.exports = class DbRegister{
    constructor(){
    }

    static stringConnection(): String {
        return `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_HOST}?retryWrites=true&w=majority`
    }

    static startConnection(){
        mongoose.connect(this.stringConnection(), {
            useNewUrlParser: true,
            useFindAndModify: false
        });
        connection.on('error', () => {
        console.log('Error in the coonection');
        process.exit(1);
        });

        connection.once('open', () => {
            console.log('We are connected!');
        });
    }
}