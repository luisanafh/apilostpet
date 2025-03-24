import { User } from '../../../data/postgres/models/user.model';
import { UserStatus } from '../../../data/postgres/models/user.model';
import { CustomError } from '../../../domain';
import { regularExp } from '../../../config/reggex'; // Importar el objeto regularExp

export class DeleteUserService {
  async execute(userId: string) {
    try {
      if (!regularExp.uuid.test(userId)) {
        throw CustomError.badRequest(
          'Invalid user ID format. Please provide a valid UUID.'
        );
      }

      const user = await this.ensureUserExists(userId);

      user.status = UserStatus.INACTIVE;

      try {
        await user.save();
        return true;
      } catch (error) {
        throw CustomError.internalServer('Error trying to delete user');
      }
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer(
        'An error occurred while deleting the user'
      );
    }
  }

  private async ensureUserExists(userId: string) {
    const user = await User.findOne({
      select: ['id'],
      where: {
        id: userId,
        status: UserStatus.ACTIVE,
      },
    });

    if (!user) {
      throw CustomError.notFound(`User with id ${userId} not found`);
    }

    return user;
  }
}
