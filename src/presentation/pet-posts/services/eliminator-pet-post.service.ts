import { regularExp } from '../../../config/reggex';
import {
  PetPost,
  PetPostStatus,
} from '../../../data/postgres/models/pet.post.model';
import { CustomError } from '../../../domain';

export class DeletePetPostService {
  async execute(id: string) {
    this.validateId(id);

    const post = await this.ensurePostExists(id);

    post.status = PetPostStatus.REJECTED;

    try {
      await post.save();
      return true;
    } catch (error) {
      throw CustomError.internalServer('Error trying to delete post');
    }
  }

  private async ensurePostExists(id: string): Promise<PetPost> {
    const post = await PetPost.findOne({
      select: ['id'],
      where: {
        id: id,
        status: PetPostStatus.APPROVED,
      },
    });

    if (!post) {
      throw CustomError.notFound(`Post with id ${id} not found`);
    }

    return post;
  }

  private validateId(id: string): void {
    if (!regularExp.uuid.test(id)) {
      throw CustomError.badRequest('Invalid ID format');
    }
  }
}
