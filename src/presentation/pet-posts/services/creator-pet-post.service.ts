import { PetPost } from '../../../data/postgres/models/pet.post.model';
import { CreatePetPostDto } from '../../../domain/dtos/post-pet/create-post.dto';
import { CustomError } from '../../../domain';

export class CreatePetPostService {
  async execute(postData: CreatePetPostDto) {
    const petpost = new PetPost();

    petpost.pet_name = postData.pet_name;
    petpost.description = postData.description;
    petpost.image_url = postData.image_url;

    try {
      const petPostCreated = await petpost.save();
      return petPostCreated;
    } catch (error) {
      console.error('Error creating pet post:', error);
      throw CustomError.internalServer(
        'An error occurred while creating the pet post'
      );
    }
  }
}
