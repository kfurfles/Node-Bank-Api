const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const DotEnv = require('dotenv')
DotEnv.config();

module.exports = class Server{
    PORT = parseInt(process.env.PORT)
    app = express();
    server: any;
    io: any;
    constructor(){
        this.app.use(bodyParser.json());
        this.server = require('http').createServer(this.app)
        this.io = require('socket.io')(this.server)
        this.initializeRegisters()
    }

    private initializeRegisters(): void {
        this.registerIo()
        this.registerCors()
    }

    private registerIo() : void{
        this.app.use((req, res, next) => {
            req.io = this.io;
            next()
        })
    }

    private registerCors() :void {
        this.app.use(cors())
    }

    public register(callback: Function){
        callback(this.app)
    }

    public start(){
        console.log(this.PORT)
        this.server.listen(this.PORT,()=>{
            console.log(`Server Listen in PORT:${this.PORT}`)
        })
    }
}
