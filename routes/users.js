const { Router } = require("express");
const router = Router();
const {
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  postUser,
} = require("../controllers/usersController");
const { isModerator, isAdmin, verifyToken } = require("../middlewares/authJwt");

// Rutas para usuarios http://localhost:4000/api/users/

router.get("/", [verifyToken, isModerator], getUsers);
router.get("/:usersId", [verifyToken, isModerator], getUserById);
router.put("/:usersId", [verifyToken, isModerator], updateUserById);
router.delete("/:usersId", [verifyToken, isAdmin], deleteUserById);

module.exports = router;
