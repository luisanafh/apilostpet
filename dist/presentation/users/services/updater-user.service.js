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
exports.UpdateUserService = void 0;
const user_model_1 = require("../../../data/postgres/models/user.model");
const user_model_2 = require("../../../data/postgres/models/user.model");
const domain_1 = require("../../../domain");
class UpdateUserService {
    execute(userId, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.ensureUserExists(userId);
            if (userData.email && userData.email !== user.email) {
                const emailExists = yield user_model_1.User.findOne({
                    where: {
                        email: userData.email,
                        status: user_model_2.UserStatus.ACTIVE,
                    },
                });
                if (emailExists) {
                    throw domain_1.CustomError.conflict('The email is already in use');
                }
            }
            user.name = userData.name || user.name;
            user.email = userData.email || user.email;
            try {
                yield user.save();
                return {
                    message: 'User updated successfully',
                };
            }
            catch (error) {
                throw domain_1.CustomError.internalServer('An error occurred while updating the user');
            }
        });
    }
    ensureUserExists(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findOne({
                where: {
                    id: userId,
                    status: user_model_2.UserStatus.ACTIVE,
                },
            });
            if (!user) {
                throw domain_1.CustomError.notFound(`User with id ${userId} not found`);
            }
            return user;
        });
    }
}
exports.UpdateUserService = UpdateUserService;
