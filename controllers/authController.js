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
    //la validacion del rol la muevo a los middlewares

    // await sendEmail({
    //   email: email,
    //   body: `  ` /* ACÁ VA EL HTML DEL MAIL PARA LA VALIDACIÓN */,
    // });

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

    res.json({ token: token });
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
  res.status(200).json({ message: "Verified route" });
};
