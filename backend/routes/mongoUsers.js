// routes/mongoUsers.js - MongoDB 路由

const express = require('express');
const router = express.Router();
const userController = require('../controllers/mongoUserController');
const { validateRequired, validateUser } = require('../middleware/validation');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.post('/', validateRequired, validateUser, userController.createUser);
router.put('/:id', validateUser, userController.updateUserById);
router.delete('/:id', userController.deleteUserById);

module.exports = router;
