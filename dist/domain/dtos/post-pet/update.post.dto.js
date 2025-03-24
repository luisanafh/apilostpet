"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePetPostDto = void 0;
const reggex_1 = require("../../../config/reggex");
class UpdatePetPostDto {
    constructor(pet_name, image_url, description, isFound) {
        this.pet_name = pet_name;
        this.image_url = image_url;
        this.description = description;
        this.isFound = isFound;
    }
    static execute(object) {
        const { pet_name, image_url, description, isFound } = object;
        if (!pet_name)
            return ['El nombre es requerido'];
        if (!reggex_1.regularExp.pet_name.test(pet_name))
            return ['El nombre de la mascota solo puede contener letras'];
        if (!image_url)
            return ['La URL de la imagen es requerida'];
        if (!reggex_1.regularExp.image_url.test(image_url))
            return ['La URL de la imagen no es válida'];
        if (!description)
            return ['La descripción es requerida'];
        if (typeof isFound !== 'boolean')
            return ['El estado "isFound" debe ser un valor booleano'];
        return [
            undefined,
            new UpdatePetPostDto(pet_name.trim(), image_url.trim(), description.trim(), isFound),
        ];
    }
}
exports.UpdatePetPostDto = UpdatePetPostDto;
