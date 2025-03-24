import { regularExp } from '../../../config/reggex';

export class UpdatePetPostDto {
  constructor(
    public pet_name: string,
    public image_url: string,
    public description: string,
    public isFound: boolean
  ) {}

  static execute(object: { [key: string]: any }): [string?, UpdatePetPostDto?] {
    const { pet_name, image_url, description, isFound } = object;

    if (!pet_name) return ['El nombre es requerido'];
    if (!regularExp.pet_name.test(pet_name))
      return ['El nombre de la mascota solo puede contener letras'];
    if (!image_url) return ['La URL de la imagen es requerida'];
    if (!regularExp.image_url.test(image_url))
      return ['La URL de la imagen no es válida'];
    if (!description) return ['La descripción es requerida'];
    if (typeof isFound !== 'boolean')
      return ['El estado "isFound" debe ser un valor booleano'];

    return [
      undefined,
      new UpdatePetPostDto(
        pet_name.trim(),
        image_url.trim(),
        description.trim(),
        isFound
      ),
    ];
  }
}
