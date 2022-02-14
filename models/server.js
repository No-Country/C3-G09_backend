//WebServer express basado en clases
const express = require("express");

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT_SERVER
        this.urlServer = process.env.URL_SERVER
        this.routes();
    }

    //definimos las rutas
    routes() {

        this.app.get('/', (req, res) => {
            res.send('Hello ParkApp')
        })

    }

    listen() {

        this.app.listen(this.port, () => {
            console.log(`Server listening on ${this.urlServer}:${this.port}`)
        })
    }
}

module.exports = Server;