import { regularExp } from '../../../config/reggex';

export class CreatePetPostDto {
  constructor(
    public pet_name: string,
    public description: string,
    public image_url: string
  ) {}

  static execute(object: { [key: string]: any }): [string?, CreatePetPostDto?] {
    const { pet_name, description, image_url } = object;

    if (!pet_name) return ['El nombre de la mascota es requerido'];
    if (!regularExp.pet_name.test(pet_name))
      return ['El nombre de la mascota solo puede contener letras'];

    if (!description) return ['La descripción de la mascota es requerida'];
    if (!image_url) return ['La URL de la imagen es requerida'];
    if (!regularExp.image_url.test(image_url))
      return ['La URL de la imagen no es válida'];

    return [
      undefined,
      new CreatePetPostDto(
        pet_name.trim(),
        description.trim(),
        image_url.trim()
      ),
    ];
  }
}
