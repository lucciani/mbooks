// const express = require("express");
// const userService = require("./services/UserService");

// const app = express();

// app.use(express.json())
// app.use(express.urlencoded({extended: true}))

// app.post("/", async (req, res) => {
//     const status = await userService.Create(req.body.name, req.body.email, req.body.password)
//     if(status){
//         res.send("Inserido com sucesso")
//     }else{
//         res.send("Usuario não foi inserido");
//     }
// })

// app.listen(3001, () => console.log("Server on"))
const express = require('express');
const UserRouter = require('../src/routes/UserRouter');
const BookRouter = require('../src/routes/BookRouter');


const port = 3000;
const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', UserRouter);
app.use('/books', BookRouter);

module.exports = app;