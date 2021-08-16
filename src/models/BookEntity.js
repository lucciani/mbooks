const db = require("../config/database")

const Book = new db.Schema({
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    company: {
        type: String,
    },
    edition: {
        type: String,
    },
    user: {
        type: db.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    }
});

module.exports = Book;