const express = require('express');
const UserRouter = require('../src/routes/UserRouter');
const BookRouter = require('../src/routes/BookRouter');
const UtilsRouter = require('../src/routes/UtilsRouter');


const port = 3000;
const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', UserRouter);
app.use('/books', BookRouter);
app.use('/image', UtilsRouter);

module.exports = app;