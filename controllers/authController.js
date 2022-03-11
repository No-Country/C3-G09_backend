const User = require("../models/User");
const Role = require("../models/Role");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const privateKey = fs.readFileSync("./keys/private.pem");
const { sendEmail } = require("../service/nodemailer");
const { v4: uuid } = require("uuid");
const jwtOptions = { algorithm: "RS256", expiresIn: "1h" };

exports.signUp = async (req, res) => {
  try {
    const { username, password, email, roles, name, surname, birthYear, cel } =
      req.body;

    const uid = uuid();

    const newUser = new User({
      username,
      password: await User.encryptPassword(password),
      email,
      roles,
      name,
      surname,
      birthYear,
      cel,
      uuidEmail: uid,
    });

    console.log("newUser", newUser);

    await sendEmail({
      email: email,
      body: `
    <!doctype html>
        <html>

        <head>
            <meta name="viewport" content="width=device-width" />
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>Mail de validación de usuarios</title>
            <style>
                /* -------------------------------------
                  GLOBAL RESETS
              ------------------------------------- */
                img {
                    border: none;
                    -ms-interpolation-mode: bicubic;
                    max-width: 100%;
                }

                body {
                    background-color: #F6F6F6;
                    font-family: sans-serif;
                    -webkit-font-smoothing: antialiased;
                    font-size: 14px;
                    line-height: 1.4;
                    margin: 0;
                    padding: 0;
                    -ms-text-size-adjust: 100%;
                    -webkit-text-size-adjust: 100%;
                }

                table {
                    border-collapse: separate;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    width: 100%;
                }

                table td {
                    font-family: sans-serif;
                    font-size: 14px;
                    vertical-align: top;
                }

                /* -------------------------------------
                  BODY & CONTAINER
              ------------------------------------- */
                .body {
                    background-color: #F6F6F6;
                    width: 100%;
                }

                /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
                .container {
                    display: block;
                    Margin: 0 auto !important;
                    /* makes it centered */
                    max-width: 580px;
                    padding: 10px;
                    width: 580px;
                }

                /* This should also be a block element, so that it will fill 100% of the .container */
                .content {
                    box-sizing: border-box;
                    display: block;
                    Margin: 0 auto;
                    max-width: 580px;
                    padding: 10px;
                }

                /* -------------------------------------
                  HEADER, FOOTER, MAIN
              ------------------------------------- */
                .main {
                    background: #fff;
                    border-radius: 3px;
                    width: 100%;
                }

                .wrapper {
                    box-sizing: border-box;
                    padding: 20px;
                }

                .footer {
                    clear: both;
                    padding-top: 10px;
                    text-align: center;
                    width: 100%;
                }

                .footer td,
                .footer p,
                .footer span,
                .footer a {
                    color: #999999;
                    font-size: 12px;
                    text-align: center;
                }

                /* -------------------------------------
                  TYPOGRAPHY
              ------------------------------------- */
                h1,
                h2,
                h3,
                h4 {
                    color: #000000;
                    font-family: sans-serif;
                    font-weight: 400;
                    line-height: 1.4;
                    margin: 0;
                    Margin-bottom: 30px;
                }

                h1 {
                    font-size: 35px;
                    font-weight: 300;
                    text-align: center;
                    text-transform: capitalize;
                }

                p,
                ul,
                ol {
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: normal;
                    margin: 0;
                    Margin-bottom: 15px;
                }

                p li,
                ul li,
                ol li {
                    list-style-position: inside;
                    margin-left: 5px;
                }

                a {
                    color: #3498DB;
                    text-decoration: underline;
                }

                /* -------------------------------------
                  BUTTONS
              ------------------------------------- */
                .btn {
                    box-sizing: border-box;
                    width: 100%;
                }

                .btn>tbody>tr>td {
                    padding-bottom: 15px;
                }

                .btn table {
                    width: auto;
                }

                .btn table td {
                    background-color: #FFFFFF;
                    border-radius: 5px;
                    text-align: center;
                }

                .btn a {
                    background-color: #FFFFFF;
                    border: solid 1px #3498DB;
                    border-radius: 5px;
                    box-sizing: border-box;
                    color: #3498DB;
                    cursor: pointer;
                    display: inline-block;
                    font-size: 14px;
                    font-weight: bold;
                    margin: 0;
                    padding: 12px 25px;
                    text-decoration: none;
                    text-transform: capitalize;
                }

                .btn-primary table td {
                    background-color: #3498DB;
                }

                .btn-primary a {
                    background-color: #3498DB;
                    border-color: #3498DB;
                    color: #FFFFFF;
                }

                /* -------------------------------------
                  OTHER STYLES THAT MIGHT BE USEFUL
              ------------------------------------- */
                .last {
                    margin-bottom: 0;
                }

                .first {
                    margin-top: 0;
                }

                .align-center {
                    text-align: center;
                }

                .align-right {
                    text-align: right;
                }

                .align-left {
                    text-align: left;
                }

                .clear {
                    clear: both;
                }

                .mt0 {
                    margin-top: 0;
                }

                .mb0 {
                    margin-bottom: 0;
                }

                .preheader {
                    color: transparent;
                    display: none;
                    height: 0;
                    max-height: 0;
                    max-width: 0;
                    opacity: 0;
                    overflow: hidden;
                    mso-hide: all;
                    visibility: hidden;
                    width: 0;
                }

                .powered-by a {
                    text-decoration: none;
                }

                hr {
                    border: 0;
                    border-bottom: 1px solid #F6F6F6;
                    Margin: 20px 0;
                }

                /* -------------------------------------
                  RESPONSIVE AND MOBILE FRIENDLY STYLES
              ------------------------------------- */
                @media only screen and (max-width: 620px) {
                    table[class=body] h1 {
                        font-size: 28px !important;
                        margin-bottom: 10px !important;
                    }

                    table[class=body] p,
                    table[class=body] ul,
                    table[class=body] ol,
                    table[class=body] td,
                    table[class=body] span,
                    table[class=body] a {
                        font-size: 16px !important;
                    }

                    table[class=body] .wrapper,
                    table[class=body] .article {
                        padding: 10px !important;
                    }

                    table[class=body] .content {
                        padding: 0 !important;
                    }

                    table[class=body] .container {
                        padding: 0 !important;
                        width: 100% !important;
                    }

                    table[class=body] .main {
                        border-left-width: 0 !important;
                        border-radius: 0 !important;
                        border-right-width: 0 !important;
                    }

                    table[class=body] .btn table {
                        width: 100% !important;
                    }

                    table[class=body] .btn a {
                        width: 100% !important;
                    }

                    table[class=body] .img-responsive {
                        height: auto !important;
                        max-width: 100% !important;
                        width: auto !important;
                    }
                }

                @media all {
                    .ExternalClass {
                        width: 100%;
                    }

                    .ExternalClass,
                    .ExternalClass p,
                    .ExternalClass span,
                    .ExternalClass font,
                    .ExternalClass td,
                    .ExternalClass div {
                        line-height: 100%;
                    }

                    .apple-link a {
                        color: inherit !important;
                        font-family: inherit !important;
                        font-size: inherit !important;
                        font-weight: inherit !important;
                        line-height: inherit !important;
                        text-decoration: none !important;
                    }

                    .btn-primary table td:hover {
                        background-color: #34495E !important;
                    }

                    .btn-primary a:hover {
                        background-color: #34495E !important;
                        border-color: #34495E !important;
                    }
                }
            </style>
        </head>

        <body class="">
            <table border="0" cellpadding="0" cellspacing="0" class="body">
                <tr>
                    <td>&nbsp;</td>
                    <td class="container">
                        <div class="content">
                            <table class="main">
                                <!-- START MAIN CONTENT AREA -->
                                <tr>
                                    <td class="wrapper">
                                        <table border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td>
                                                    <h1>¡Gracias ${username} por registrarte!</h1>
                                                    <h2>hola, ${name} te pedimos sólo un paso más</h2>
                                                    <h2>Para poder continuar con tu registro necesitamos que cliqueés el boton
                                                        que te dejamos aquí abajo 👇🏽</h2>
                                                    <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                                                        <tbody>
                                                            <tr>
                                                                <td align="left">
                                                                    <table border="0" cellpadding="0" cellspacing="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td> <a href="${process.env.PORT_HEROKU}/api/auth/verify/${uid}"
                                                                                        target="_blank">Confirmar email</a>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <p>Si recibió este correo electrónico por error, simplemente elimínelo. No
                                                        se suscribirá si no hace clic en el enlace de confirmación anterior.</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <!-- END MAIN CONTENT AREA -->
                            </table>
                            <!-- START FOOTER -->
                            <div class="footer">
                                <table border="0" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td class="content-block">
                                            <span class="apple-link"></span>
                                            <br> No quiere recibir mas mensajes de este tipo?<a href="#">Darse de Baja</a>.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="content-block powered-by">
                                            Powered by <a href="#">Grupo 9 TT</a>.
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <!-- END FOOTER -->
                            <!-- END CENTERED WHITE CONTAINER -->
                        </div>
                    </td>
                    <td>&nbsp;</td>
                </tr>
            </table>
        </body>

        </html>
    `,
    });

    await newUser.save(); // Guardo el usuario en la DB

    const payload = {
      id: newUser._id,
      username: newUser.username,
      roles: newUser.roles,
    };

    const token = jwt.sign(payload, privateKey, jwtOptions); // Genero el token

    res
      .status(200)
      .json({ JWT: token, data: payload, message: "User saved successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Error Grave contactarse con el admin",
    });
    console.log(error);
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await User.findOne({ email: email }).populate("roles");

    if (!userFound) return res.status(406).json({ message: "User not found" });

    const matchPassword = await User.comparePassword(
      password,
      userFound.password
    );

    if (!matchPassword)
      return res.status(401).json({ token: null, message: "Invalid password" });

    const payload = {
      id: userFound._id,
      username: userFound.username,
      roles: userFound.roles,
    };

    const token = jwt.sign(payload, privateKey, jwtOptions);

    res.json({ token: token, payload: payload });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

exports.verify = async (req, res) => {
  try {
    const { uid } = req.params;
    await User.updateOne({ uuidEmail: uid }, { $set: { enabled: true } });
    res.status(200).redirect("/api/auth/verified");
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

exports.verified = (req, res) => {
  res.status(200).redirect(`${process.env.URL_FRONT}`);
};
