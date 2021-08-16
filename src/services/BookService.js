let book = require("../models/BookEntity")
let db = require("../config/database");

const Book = db.model("Book", book);

class BookService {

    async Create(title, author, company, edition, userId) {
        var newBook = new Book({
            title,
            author,
            company,
            edition, 
            user: userId
        });
        return await newBook.save();
    }

    async GetAll() {
        return await Book.find().populate('user');
    }

    async GetById(id) {
        return await Book.findById({ '_id': id });
    }

    async GetByCompany(company) {
        return await Book.findOne({ 'company': company });
    }

    async GetByAuthor(author) {
        return await Book.findOne({ 'author': author });
    }

    async DeleteById(id) {
        return await Book.findByIdAndDelete(id);
    }

    async UpdateById(id, { title, author, company, edition }) {
        const bookOp = await Book.findOne({ '_id': id });
        if (bookOp) {
            if (title) {
                bookOp.title = title;
            }
            if (author) {
                bookOp.author = author;
            }
            if (company) {
                bookOp.company = company;
            }
            if (edition) {
                bookOp.edition = edition;
            }
            return await bookOp.save();
        }
        return;
    }
}
module.exports = new BookService();