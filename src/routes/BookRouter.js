const express = require("express");
const authMiddleware = require('../middlewares/auth');

const BookController = require("../controllers/BookController");

const router = express.Router();
const bookController = new BookController();

router.use(authMiddleware);
router.get('/', (req, res) => bookController.find(req, res));
router.get('/:id', (req, res) => bookController.findOne(req, res));
router.post('/', (req, res) => bookController.create(req, res));
router.post('/:id', (req, res) => bookController.update(req, res));
router.delete('/:id', (req, res) => bookController.remove(req, res));


module.exports = router;