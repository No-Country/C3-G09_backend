const { createRoles } = require("./config/InitialSetup.js");

//Configuramos dotenv
require("dotenv").config();

createRoles(); // Genera los roles la primer vez que se inicializa la app

//Server
const Server = require("./models/Server");
const server = new Server();

server.listen(); //inicializacion del server
