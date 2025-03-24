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
exports.DeleteUserService = void 0;
const user_model_1 = require("../../../data/postgres/models/user.model");
const user_model_2 = require("../../../data/postgres/models/user.model");
const domain_1 = require("../../../domain");
class DeleteUserService {
    execute(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.ensureUserExists(userId);
            user.status = user_model_2.UserStatus.INACTIVE;
            try {
                yield user.save();
            }
            catch (error) {
                throw domain_1.CustomError.internalServer('Error trying to delete user');
            }
            return true;
        });
    }
    ensureUserExists(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findOne({
                select: ['id'],
                where: {
                    id: userId,
                    status: user_model_2.UserStatus.ACTIVE,
                },
            });
            if (!user) {
                throw domain_1.CustomError.notFound(`User with id: ${userId} not found`);
            }
            return user;
        });
    }
}
exports.DeleteUserService = DeleteUserService;
