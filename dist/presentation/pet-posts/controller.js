"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const domain_1 = require("../../domain");
class PostController {
    constructor(createPost, finderPosts, finderPost, updatePost, deletePost) {
        this.createPost = createPost;
        this.finderPosts = finderPosts;
        this.finderPost = finderPost;
        this.updatePost = updatePost;
        this.deletePost = deletePost;
        this.handleError = (error, res) => {
            if (error instanceof domain_1.CustomError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            console.error(error);
            return res.status(500).json({ message: 'Something went very wrong' });
        };
        this.findAll = (req, res) => {
            this.finderPosts
                .execute()
                .then((posts) => res.status(200).json(posts))
                .catch((err) => this.handleError(err, res));
        };
        this.creator = (req, res) => {
            const [error, createPetPostDto] = domain_1.CreatePetPostDto.execute(req.body);
            if (error) {
                return res.status(422).json({ message: error });
            }
            this.createPost
                .execute(createPetPostDto)
                .then((createPost) => res.status(201).json(createPost))
                .catch((err) => this.handleError(err, res));
        };
        this.findOne = (req, res) => {
            const { id } = req.params;
            this.finderPost
                .execute(id)
                .then((post) => res.status(200).json(post))
                .catch((err) => this.handleError(err, res));
        };
        this.update = (req, res) => {
            const { id } = req.params;
            const [error, updatePetPostDto] = domain_1.UpdatePetPostDto.execute(req.body);
            if (error) {
                return res.status(422).json({ message: error });
            }
            this.updatePost
                .execute(id, updatePetPostDto)
                .then((user) => res.status(200).json(user))
                .catch((err) => this.handleError(err, res));
        };
        this.delete = (req, res) => {
            const { id } = req.params;
            this.deletePost
                .execute(id)
                .then(() => res.status(204).json(null))
                .catch((err) => this.handleError(err, res));
        };
    }
}
exports.PostController = PostController;
