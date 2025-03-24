"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetPostRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const creator_pet_post_service_1 = require("./services/creator-pet-post.service");
const finder_pet_posts_service_1 = require("./services/finder-pet-posts.service");
const finder_pet_post_service_1 = require("./services/finder-pet-post.service");
const updater_pet_post_service_1 = require("./services/updater-pet-post.service");
const eliminator_pet_post_service_1 = require("./services/eliminator-pet-post.service");
class PetPostRoutes {
    static get routes() {
        const creatorPost = new creator_pet_post_service_1.CreatePetPostService();
        const finderPosts = new finder_pet_posts_service_1.FinderPetPostsService();
        const finderPost = new finder_pet_post_service_1.FinderPetPostService();
        const updatePost = new updater_pet_post_service_1.UpdatePetPostService();
        const deletePost = new eliminator_pet_post_service_1.DeletePetPostService();
        const controller = new controller_1.PostController(creatorPost, finderPosts, finderPost, updatePost, deletePost);
        const router = (0, express_1.Router)();
        router.get('/', controller.findAll);
        router.get('/:id', controller.findOne);
        router.post('/', controller.creator);
        router.patch('/:id', controller.update);
        router.delete('/:id', controller.delete);
        return router;
    }
}
exports.PetPostRoutes = PetPostRoutes;
