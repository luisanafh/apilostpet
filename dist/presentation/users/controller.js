"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    constructor(registerUserService) {
        this.registerUserService = registerUserService;
        this.register = (req, res) => {
            const { name, email, password } = req.body;
            this.registerUserService
                .execute({ name, email, password })
                .then((result) => res.status(200).json({ message: result }))
                .catch((error) => res.status(500).json({ message: error }));
        };
    }
}
exports.UserController = UserController;
