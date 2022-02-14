const createError = require("http-errors");

const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const DBConnection = require("./config/DB");

//Configuramos dotenv
require('dotenv').config()

//Server
const Server = require('./models/server')
const server = new Server()

server.listen() //inicializacion del server

// const indexRouter = require("./routes/index");
// const usersRouter = require("./routes/users");


// // view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
// //app.use(cors({ origin: allowedOrigins }));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

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

// async function main() {
//   //DBConnection(); // Llamado a la conexión con MongoDB
//   await app.listen(process.env.PORT_SERVER);
//   console.log(`Server listening on ${process.env.URL_SERVER}:${port}`);
// }

// main();

// module.exports = app;
