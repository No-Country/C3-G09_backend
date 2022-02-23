const { Router } = require("express");
const router = Router();
const {
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  postUser,
} = require("../controllers/usersController");

// Rutas para usuarios http://localhost:4000/api/users/

router.get("/", getUsers);
router.get("/:usersId", getUserById);
router.put("/:usersId", updateUserById);
router.delete("/:usersId", deleteUserById);
router.post("/", postUser); //despues mover esta ruta

module.exports = router;
