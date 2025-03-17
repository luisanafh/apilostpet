import { PetPost } from '../../../data/postgres/models/pet.post.model';

export class CreatePetPostService {
  async execute(postData: any) {
    const petpost = new PetPost();
    petpost.user = postData.user || null;
    petpost.pet_name = postData.pet_name;
    petpost.description = postData.description;
    petpost.image_url = postData.image_url;
    try {
      const petPostCreated = await petpost.save();
      return petPostCreated;
    } catch (error) {
      throw new Error('An error occurred while creating the pet post');
    }
  }
}
