"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const domain_1 = require("../../domain");
class UserController {
    constructor(registerUser, finderUsers, finderUser, loginUsers, updateUser, deleteUser) {
        this.registerUser = registerUser;
        this.finderUsers = finderUsers;
        this.finderUser = finderUser;
        this.loginUsers = loginUsers;
        this.updateUser = updateUser;
        this.deleteUser = deleteUser;
        this.handleError = (error, res) => {
            if (error instanceof domain_1.CustomError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            console.error(error);
            return res.status(500).json({ message: 'Something went very wrong' });
        };
        this.findAll = (req, res) => {
            this.finderUsers
                .execute()
                .then((users) => res.status(200).json(users))
                .catch((err) => this.handleError(err, res));
        };
        this.register = (req, res) => {
            const [error, createUserDto] = domain_1.CreateUserDto.execute(req.body);
            if (error) {
                return res.status(422).json({ message: error });
            }
            this.registerUser
                .execute(createUserDto)
                .then((user) => res.status(201).json(user))
                .catch((err) => this.handleError(err, res));
        };
        this.findOne = (req, res) => {
            const { id } = req.params;
            this.finderUser
                .execute(id)
                .then((user) => res.status(200).json(user))
                .catch((err) => this.handleError(err, res));
        };
        this.login = (req, res) => {
            this.loginUsers.execute(res);
        };
        this.update = (req, res) => {
            const { id } = req.params;
            const [error, updateUserDto] = domain_1.UpdateUserDto.execute(req.body);
            if (error) {
                return res.status(422).json({ message: error });
            }
            this.updateUser
                .execute(id, updateUserDto)
                .then((user) => res.status(200).json(user))
                .catch((err) => this.handleError(err, res));
        };
        this.delete = (req, res) => {
            const { id } = req.params;
            this.deleteUser
                .execute(id)
                .then(() => res.status(204).json(null))
                .catch((err) => this.handleError(err, res));
        };
    }
}
exports.UserController = UserController;
