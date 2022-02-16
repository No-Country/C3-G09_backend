const { response } = require("express"); // solo para poder ver el autocompletado

const getUsers = (req, res = response) => {
  res.json({
    ok: true,
    msg: "GET: Hello Parkapp api user, from controller",
  });
};

const postUser = (req, res = response) => {
  res.json({
    ok: true,
    msg: "POST request user",
  });
};

const deleteUser = (req, res = response) => {
  res.json({
    ok: true,
    msg: "DELETE request user",
  });
};

const putUser = (req, res = response) => {
  res.json({
    ok: true,
    msg: "PUT request user",
  });
};

module.exports = {
  getUsers,
  postUser,
  putUser,
  deleteUser,
};
