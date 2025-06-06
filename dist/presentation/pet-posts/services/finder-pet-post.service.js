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
exports.FinderPetPostService = void 0;
const pet_post_model_1 = require("../../../data/postgres/models/pet.post.model");
const domain_1 = require("../../../domain");
class FinderPetPostService {
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield pet_post_model_1.PetPost.findOne({
                    relations: ['user'],
                    select: {
                        id: true,
                        pet_name: true,
                        description: true,
                        image_url: true,
                        isFound: true,
                        user: {
                            name: true,
                        },
                    },
                    where: {
                        id: id,
                        status: pet_post_model_1.PetPostStatus.APPROVED,
                    },
                });
                if (!post) {
                    throw domain_1.CustomError.notFound('Post not found');
                }
                return post;
            }
            catch (error) {
                if (error instanceof domain_1.CustomError) {
                    throw error;
                }
                throw domain_1.CustomError.internalServer('An error occurred while searching for the post');
            }
        });
    }
}
exports.FinderPetPostService = FinderPetPostService;
