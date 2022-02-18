const { Router } = require("express");
const router = Router();
const {
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/userController");

// Rutas para usuarios http://localhost:4000/api/users/

router.get("/", getUsers);
router.get("/:usersId", getUserById);
router.put("/:usersId", updateUserById);
router.delete("/:usersId", deleteUserById);

module.exports = router;
