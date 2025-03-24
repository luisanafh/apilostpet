import { User } from '../../../data/postgres/models/user.model';
import { UserStatus } from '../../../data/postgres/models/user.model';
import { UpdateUserDto } from '../../../domain/dtos/users/update-user.dto';
import { CustomError } from '../../../domain';
import { QueryFailedError } from 'typeorm';

export class UpdateUserService {
  async execute(userId: string, userData: UpdateUserDto) {
    try {
      const user = await this.ensureUserExists(userId);

      if (userData.email && userData.email !== user.email) {
        const emailExists = await User.findOne({
          where: {
            email: userData.email,
            status: UserStatus.ACTIVE,
          },
        });

        if (emailExists) {
          throw CustomError.conflict('The email is already in use');
        }
      }

      user.name = userData.name || user.name;
      user.email = userData.email || user.email;

      await user.save();
      return {
        message: 'User updated successfully',
      };
    } catch (error) {
      if (error instanceof QueryFailedError) {
        console.error('Database error:', error.message);
        if (error.message.includes('invalid input syntax for type uuid')) {
          throw CustomError.badRequest(
            'Invalid user ID format. Please provide a valid UUID.'
          );
        }
        throw CustomError.internalServer(
          'A database error occurred while updating the user.'
        );
      }

      throw error;
    }
  }

  private async ensureUserExists(userId: string): Promise<User> {
    const user = await User.findOne({
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
