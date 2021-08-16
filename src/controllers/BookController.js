const bookService = require("../services/BookService");

class BookController {

    async create(request, response) {
        try {

            let errors = []
            let { title, author, company, edition } = request.body;

            if (!title) {
                errors.push({
                    param: "title",
                    message: "Title is required"
                })
            }

            if (!author) {
                errors.push({
                    param: "author",
                    message: "Author is required"
                })
            }

            if (!company) {
                errors.push({
                    param: "company",
                    message: "Company is required"
                })
            }

            if (!edition) {
                errors.push({
                    param: "edition",
                    message: "Edition is required"
                })
            }

            console.log(errors)
            if (!errors.length == 0) {
                return response.status(400).json({ error: errors });
            } else {
                const book = await bookService.Create(
                    title,
                    author,
                    company,
                    edition,
                    request.userId);
                return response.status(201).send({ book: book });
            }
        } catch (error) {
            console.log(error)
            return response.status(400).send({ error: 'Book was not created' });
        };
    };

    async remove(request, response) {
        let { id } = request.params.id
        await bookService.DeleteById(request.params.id).then(book => {
            if (book) {
                return response.redirect(204, "/" + id)
            } else {
                return response.status(404).send({ error: 'Book not found' });
            }
        }).catch(error => {
            return response.status(404).send({ error: 'Book not found' });
        })

    };

    async find(request, response) {
        const books = await bookService.GetAll();
        if (books) {
            return response.status(200).send({ books: books });
        } else {
            return response.status(404).send({ error: 'Book not found' });
        }
    };

    async findOne(request, response) {
        const book = await bookService.GetById(request.params.id);
        if (book) {
            return response.status(200).send({ book: book });
        } else {
            return response.status(404).send({ error: 'Book not found' });
        }
    };

    async update(request, response) {
        let errors = []
        let id = request.params.id;
        let { title, author, company, edition } = request.body;

        if (!id) {
            errors.push({
                param: "id",
                message: "Id is required"
            })
        }

        if (!errors.length == 0) {
            return response.status(400).json({ error: errors });
        } else {
            const book = await bookService.UpdateById(id, { title, author, company, edition })
            if (book) {
                return response.status(200).send({ book: book });
            } else {
                return response.status(404).send({ error: 'Book not found' });
            }
        }
    };
};

module.exports = BookController;