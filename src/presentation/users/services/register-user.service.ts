import { User } from '../../../data/postgres/models/user.model';
import { CreateUserDto } from '../../../domain/dtos/users/create-user.dto';
import { CustomError } from '../../../domain';

export class RegisterUserService {
  async execute(userData: CreateUserDto) {
    const user = new User();

    user.name = userData.name;
    user.email = userData.email;
    user.password = userData.password;

    try {
      const userCreated = await user.save();
      return userCreated;
    } catch (error) {
      throw CustomError.internalServer(
        'An error occurred while registering the user'
      );
    }
  }
}
