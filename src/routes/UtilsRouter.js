const express = require("express");
const UserController = require("../controllers/UserController");
const authMiddleware = require('../middlewares/auth');
const multer = require('multer');
const multerConfig = require('../config/multer');

const router = express.Router();
const userController = new UserController();

router.use(authMiddleware);
router.post('/', multer(multerConfig).single("file"), (req, res) => userController.upload(req, res));



module.exports = router;