"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePetPostDto = void 0;
const reggex_1 = require("../../../config/reggex");
class CreatePetPostDto {
    constructor(pet_name, description, image_url) {
        this.pet_name = pet_name;
        this.description = description;
        this.image_url = image_url;
    }
    static execute(object) {
        const { pet_name, description, image_url } = object;
        if (!pet_name)
            return ['El nombre de la mascota es requerido'];
        if (!reggex_1.regularExp.pet_name.test(pet_name))
            return ['El nombre de la mascota solo puede contener letras'];
        if (!description)
            return ['La descripción de la mascota es requerida'];
        if (!image_url)
            return ['La URL de la imagen es requerida'];
        if (!reggex_1.regularExp.image_url.test(image_url))
            return ['La URL de la imagen no es válida'];
        return [
            undefined,
            new CreatePetPostDto(pet_name.trim(), description.trim(), image_url.trim()),
        ];
    }
}
exports.CreatePetPostDto = CreatePetPostDto;
