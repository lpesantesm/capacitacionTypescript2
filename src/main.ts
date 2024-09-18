import express  from 'express'

class Server {
    public app!: express.Application

    constructor(){
        this.app = express()
        this.routes();
        this.middleware();
        this.config()       
    }

    routes(){

    }

    middleware(){

    }

    config(){

    }

    listen(){
        this.app.listen(3001, "localhost",() =>{
            console.log("Servidor levantado")
        })
    }
}

// ! Se levante el servidor aqui
const servidor = new Server()
servidor.listen()