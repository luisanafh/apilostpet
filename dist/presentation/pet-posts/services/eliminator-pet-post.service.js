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
exports.DeletePetPostService = void 0;
const pet_post_model_1 = require("../../../data/postgres/models/pet.post.model");
const domain_1 = require("../../../domain");
class DeletePetPostService {
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.ensurePostExists(id);
            post.status = pet_post_model_1.PetPostStatus.REJECTED;
            try {
                yield post.save();
                return true;
            }
            catch (error) {
                throw domain_1.CustomError.internalServer('Error trying to delete post');
            }
        });
    }
    ensurePostExists(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield pet_post_model_1.PetPost.findOne({
                select: ['id'],
                where: {
                    id: id,
                    status: pet_post_model_1.PetPostStatus.APPROVED,
                },
            });
            if (!post) {
                throw domain_1.CustomError.notFound(`Post with id ${id} not found`);
            }
            return post;
        });
    }
}
exports.DeletePetPostService = DeletePetPostService;
