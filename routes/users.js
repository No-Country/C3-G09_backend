
const {Router} = require('express');
const { getUsers, putUser, postUser,deleteUser } = require('../controllers/users');
const router = Router();

// Rutas para usuarios http://localhost:4000/api/users/

router.get('/', getUsers)
router.post('/',postUser)
router.put('/',putUser)
router.delete('/',deleteUser)



module.exports = router;
