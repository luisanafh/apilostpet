import {
  PetPost,
  PetPostStatus,
} from '../../../data/postgres/models/pet.post.model';

export class DeletePetPostService {
  async execute(Id: string) {
    const post = await this.ensureUserExists(Id);

    post.status = PetPostStatus.REJECTED;
    try {
      await post.save();
    } catch (error) {
      throw new Error('Error trying to delete post');
    }

    return true;
  }

  private async ensureUserExists(Id: string) {
    const post = await PetPost.findOne({
      select: ['id'],
      where: {
        id: Id,
        status: PetPostStatus.APPROVED,
      },
    });

    if (!post) {
      throw new Error(`post with id: ${Id} not found`);
    }

    return post;
  }
}
