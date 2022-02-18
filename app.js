const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const { createRoles } = require("./config/initialSetup");

//Configuramos dotenv
require("dotenv").config();

createRoles(); // Genera los roles la primer vez que se inicializa la app

//Server
const Server = require("./models/Server");
const server = new Server();

server.listen(); //inicializacion del server

// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
// //app.use(cors({ origin: allowedOrigins }));

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });
