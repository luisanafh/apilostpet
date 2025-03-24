"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserService = void 0;
const user_model_1 = require("../../../data/postgres/models/user.model");
const domain_1 = require("../../../domain");
class RegisterUserService {
    execute(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new user_model_1.User();
            const emailExists = yield user_model_1.User.findOne({
                where: {
                    email: userData.email,
                },
            });
            if (emailExists) {
                throw domain_1.CustomError.conflict('The email is already in use');
            }
            // Asignar los datos del DTO al modelo User
            user.name = userData.name;
            user.email = userData.email;
            user.password = userData.password;
            try {
                const userCreated = yield user.save();
                return userCreated;
            }
            catch (error) {
                console.error('Error creating user:', error);
                throw domain_1.CustomError.internalServer('An error occurred while registering the user');
            }
        });
    }
}
exports.RegisterUserService = RegisterUserService;
