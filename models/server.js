//WebServer express basado en clases
const express = require("express");

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT_SERVER
        this.urlServer = process.env.URL_SERVER

        //Middlewares
        this.middlewares();

        //Rutas de la app
        this.routes();
    }



    // Middlewares

    middlewares() {
        //Configuracion del directorio publico
        this.app.use( express.static('public') );
        
    }


    //definimos las rutas
    routes() {


    }

    listen() {

        this.app.listen(this.port, () => {
            console.log(`Server listening on ${this.urlServer}:${this.port}`)
        })
    }
}

module.exports = Server;