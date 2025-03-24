"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const finder_users_service_1 = require("./services/finder-users.service");
const register_user_service_1 = require("./services/register-user.service");
const login_user_service_1 = require("./services/login-user.service");
const finder_user_service_1 = require("./services/finder-user.service");
const updater_user_service_1 = require("./services/updater-user.service");
const eliminator_user_service_1 = require("./services/eliminator-user.service");
class UserRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const registerUser = new register_user_service_1.RegisterUserService();
        const finderUsers = new finder_users_service_1.FinderUsersService();
        const finderUser = new finder_user_service_1.FinderUserService();
        const loginUsers = new login_user_service_1.loginUsersService();
        const updateUsers = new updater_user_service_1.UpdateUserService();
        const deleteUser = new eliminator_user_service_1.DeleteUserService();
        const controller = new controller_1.UserController(registerUser, finderUsers, finderUser, loginUsers, updateUsers, deleteUser);
        router.get('/', controller.findAll);
        router.post('/register', controller.register);
        router.get('/:id', controller.findOne);
        router.get('/login', controller.login);
        router.patch('/:id', controller.update);
        router.delete('/:id', controller.delete);
        return router;
    }
}
exports.UserRoutes = UserRoutes;
