const User = require("../models/User");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $lookup: {
          from: "roles",
          localField: "roles",
          foreignField: "_id",
          as: "roles",
        },
      },
    ]);
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const id = req.params.userId;
    const user = await User.findById(id);
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const id = req.params.userId;
    const obj = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, obj, { new: true });
    res.status(200).json({ updatedUser: updatedUser });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const id = req.params.userId;
    await User.updateOne({ _id: id }, { $set: { deleted: true } });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

/* El post se haria en /auth/singUp - por ahora lo dejo aca hasta que funcione bien la creacion de usuario*/

exports.postUser = async (req, res = response) => {
  //data enviada desde el cliente
  const body = req.body;

  const user = new User(body);
  await user.save()

 res.json({
   ok: true,
   msg: "Usuario añadido a la bd",
   user
 });
};



// se puede crear un usuario muy basico sin validaciones por el momento 

// {

//   "name":"user2",
//   "edad":34,
//   "email":"parkapp2@gmail.com",
//   "password":"parkpark",
//   "username":"parker2"
// }