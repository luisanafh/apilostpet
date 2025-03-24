import { User } from '../../../data/postgres/models/user.model';
import { UserStatus } from '../../../data/postgres/models/user.model';
import { CustomError } from '../../../domain';
import { regularExp } from '../../../config/reggex';

export class FinderUserService {
  async execute(id: string) {
    try {
      if (!regularExp.uuid.test(id)) {
        throw CustomError.badRequest(
          'Invalid user ID format. Please provide a valid UUID.'
        );
      }

      const user = await User.findOne({
        select: ['id', 'name', 'email', 'role'],
        where: {
          id: id,
          status: UserStatus.ACTIVE,
        },
      });

      if (!user) {
        throw CustomError.notFound(`User with id ${id} not found`);
      }

      return user;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer(
        'An error occurred while searching for the user'
      );
    }
  }
}
