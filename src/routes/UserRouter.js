const express = require("express");

const UserController = require("../controllers/UserController");
const user = require("../models/UserEntity");
let db = require("../config/database");

const User = db.model("User", user);

const router = express.Router();
const userController = new UserController();

router.post('/auth', (req, res) => userController.auth(req, res));
router.get('/', (req, res) => userController.find(req, res));
router.get('/:id', (req, res) => userController.findById(req, res));
router.get('/:email', (req, res) => userController.findOne(req, res));
router.post('/', (req, res) => userController.create(req, res));
router.put('/:id', (req, res) => userController.update(req, res));
router.delete('/:id', (req, res) => userController.remove(req, res));

module.exports = router;