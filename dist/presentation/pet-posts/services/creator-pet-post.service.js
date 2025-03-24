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
exports.CreatePetPostService = void 0;
const pet_post_model_1 = require("../../../data/postgres/models/pet.post.model");
const domain_1 = require("../../../domain");
class CreatePetPostService {
    execute(postData) {
        return __awaiter(this, void 0, void 0, function* () {
            const petpost = new pet_post_model_1.PetPost();
            petpost.pet_name = postData.pet_name;
            petpost.description = postData.description;
            petpost.image_url = postData.image_url;
            try {
                const petPostCreated = yield petpost.save();
                return petPostCreated;
            }
            catch (error) {
                console.error('Error creating pet post:', error);
                throw domain_1.CustomError.internalServer('An error occurred while creating the pet post');
            }
        });
    }
}
exports.CreatePetPostService = CreatePetPostService;
