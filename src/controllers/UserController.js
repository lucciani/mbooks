const userService = require("../services/UserService");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

class UserController {

    async create(request, response) {
        try {

            let errors = []
            let { name, email, password } = request.body;

            if (!name) {
                errors.push({
                    param: "name",
                    message: "User is required"
                })
            }

            if (!email) {
                errors.push({
                    param: "email",
                    message: "Email is required"
                })
            }

            if (!request.body.password) {
                errors.push({
                    param: "password",
                    message: "Password is required"
                })
            }

            console.log(errors)
            if (!errors.length == 0) {
                return response.status(400).json({ error: errors });
            } else {
                const userExists = await userService.GetByEmail(email);

                if (userExists) {
                    return response.status(200).send({
                        error: {
                            param: "email",
                            message: 'There is already one with this email'
                        }
                    });
                }

                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(password, salt);

                const user = await userService.Create(
                    name,
                    email,
                    hash);
                return response.status(201).send({ 
                    user: user,
                    token: generateToken({id: user.id})
                });
            }
        } catch (error) {
            console.log(error)
            return response.status(400).send({ error: 'User was not created' });
        };
    };

    async remove(request, response) {
        await userService.DeleteById(request.params.id).then(user => {
            if (user) {
                return response.redirect(204, "/" + request.param.id)
            } else {
                return response.status(404).send({ error: 'Users not found' });
            }
        }).catch(error => {
            return response.status(404).send({ error: 'Users not found' });
        })

    };

    async find(request, response) {
        try {
            const users = await userService.GetAll();
            return response.status(200).send({ users: users });
        } catch (error) {
            console.log(error)
            return response.status(404).send({ error: 'Users not found' });
        };
    };

    async findOne(request, response) {
        const users = await userService.GetByEmail(request.params.email);
        if (users) {
            return response.status(200).send({ users: users });
        }
        return response.status(404).send({ error: 'Users not found' });
    };

    async update(request, response) {
        let errors = []
        let id = request.params.id;
        let { name, email, password } = request.body;

        if (!id) {
            errors.push({
                param: "id",
                message: "Id is required"
            })
        }

        if (!name) {
            errors.push({
                param: "name",
                message: "User is required"
            })
        }

        if (!email) {
            errors.push({
                param: "email",
                message: "Email is required"
            })
        }

        if (!errors.length == 0) {
            return response.status(400).json({ error: errors });
        } else {
            const users = await userService.UpdateById(id, { name, email })
            if (users) {
                return response.status(200).send({ users: users });
            }
            return response.status(404).send({ error: 'Users not found' });
        }
    };


    async auth(request, response) {
        const { email, password } = request.body;

        const user = await userService.GetByEmailAuth(email);

        if (!user) {
            return response.status(404).send({ error: 'Users not found' });
        }

        if (!await bcrypt.compare(password, user.password)) {
            return response.status(400).send({ error: 'Invalid password' });
        }

        user.password = undefined;

        response.status(200).send({ 
            user, 
            token: generateToken({id: user.id}),
        });


    };
};

function generateToken(params = {}) {
    console.log("params",params)
    return jwt.sign({ params }, authConfig.secret, {
        expiresIn: 86400,
    })
}

module.exports = UserController;
