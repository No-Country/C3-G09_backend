//WebServer express basado en clases
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const DBConnection = require("../config/Db");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT_SERVER;
    this.urlServer = process.env.URL_SERVER;
    this.userRoutesPath = "/api/users";

    //Middlewares
    this.middlewares();

    //Rutas de la app
    this.routes();

    // DataBase
    DBConnection();
  }

  // Middlewares

  middlewares() {
    //Configuracion CORS

    this.app.use(cors());

    //Morgan
    this.app.use(logger("dev"));

    //Configuracion del directorio publico
    this.app.use(express.static("public"));
  }

  //definimos las rutas
  routes() {
    //rutas de usuario
    this.app.use(this.userRoutesPath, require("../routes/users"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on ${this.urlServer}:${this.port}`);
    });
  }
}

module.exports = Server;
