const db = require("../config/database")

const User = new db.Schema({
    name: {
        type: String,
        require: '{PATH} is required!',
    },
    email: {
        type: String,
        require: '{PATH} is required!',
    },
    password: {
        type: String,
        require: '{PATH} is required!',
        select: false
    },
    image: {
        type: String
    }
});

module.exports = User;