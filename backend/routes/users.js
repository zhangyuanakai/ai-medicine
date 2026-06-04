// routes/users.js - 用户路由

const express = require('express');
const router = express.Router();
const { validateRequired, validateUser } = require('../middleware/validation');
const {
  getAllUsers,
  getUser,
  createUser,
  updateUserById,
  deleteUserById,
} = require('../controllers/userController');
// 路由定义
router.get('/', getAllUsers); // GET /api/users
router.get('/:id', getUser); // GET /api/users/:id
router.post('/', validateRequired, validateUser, createUser); // POST /api/users
router.put('/:id', validateUser, updateUserById); // PUT /api/users/:id
router.delete('/:id', deleteUserById); // DELETE /api/users/:id

module.exports = router;
