"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetPost = exports.PetPostStatus = void 0;
const typeorm_1 = require("typeorm");
const user_model_1 = require("./user.model");
var PetPostStatus;
(function (PetPostStatus) {
    PetPostStatus["PENDING"] = "pending";
    PetPostStatus["APPROVED"] = "approved";
    PetPostStatus["REJECTED"] = "rejected";
})(PetPostStatus || (exports.PetPostStatus = PetPostStatus = {}));
let PetPost = class PetPost extends typeorm_1.BaseEntity {
};
exports.PetPost = PetPost;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PetPost.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User, (user) => user.petPosts, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_model_1.User)
], PetPost.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255 }),
    __metadata("design:type", String)
], PetPost.prototype, "pet_name", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], PetPost.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, nullable: false }),
    __metadata("design:type", String)
], PetPost.prototype, "image_url", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PetPostStatus,
        default: PetPostStatus.APPROVED,
    }),
    __metadata("design:type", String)
], PetPost.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], PetPost.prototype, "isFound", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PetPost.prototype, "created_at", void 0);
exports.PetPost = PetPost = __decorate([
    (0, typeorm_1.Entity)()
], PetPost);
