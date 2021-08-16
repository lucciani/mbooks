let user = require("../models/UserEntity")
let db = require("../config/database");
const { body } = require("express-validator");

const User = db.model("User", user);

class UserService {

    async Create(name, email, password) {
        var newUser = new User({
            name,
            email,
            password
        });
        return await newUser.save();
    }

    async GetAll() {
        return await User.find().select('-password');
    }

    async GetByEmail(email) {
        return await User.findOne({ 'email': email });
    }

    async GetByEmailAuth(email) {
        return await User.findOne({ email }).select('+password');
    }

    async GetByNameAndEMail(name, email) {
        return await User.findOne({ 'name': name, 'email': email });
    }

    async DeleteById(id) {
        return await User.findByIdAndDelete(id);
    }

    async GetById(id) {
        return await User.findOne({ '_id': id });
    }

    async UpdateById(id, { name, email }) {
        const userOp = await User.findOne({ '_id': id });
        if (userOp) {
            userOp.name = name;
            userOp.email = email;
            return await userOp.save();
        }
        return;
    }

    async UpdateByImage(user, image) {
        user.image = image;
        return await user.save();
    }
}
module.exports = new UserService();