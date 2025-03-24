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
exports.FinderPetPostsService = void 0;
const pet_post_model_1 = require("../../../data/postgres/models/pet.post.model");
const domain_1 = require("../../../domain");
class FinderPetPostsService {
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const petPosts = yield pet_post_model_1.PetPost.find({
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
                    where: { status: pet_post_model_1.PetPostStatus.APPROVED },
                });
                const formattedPetPosts = petPosts.map((post) => (Object.assign(Object.assign({}, post), { user: post.user ? post.user.name : null })));
                return formattedPetPosts;
            }
            catch (error) {
                throw domain_1.CustomError.internalServer('An error occurred while searching for pet posts');
            }
        });
    }
}
exports.FinderPetPostsService = FinderPetPostsService;
