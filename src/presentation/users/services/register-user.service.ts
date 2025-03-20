import { User } from '../../../data/postgres/models/user.model';
import { CreateUserDto } from '../../../domain/dtos/users/create-user.dto';

export class RegisterUserService {
  async execute(userData: CreateUserDto) {
    const user = new User();

    user.name = userData.name;
    user.email = userData.email;
    user.password = userData.password;
    try {
      const UserCreated = await user.save();
      return UserCreated;
    } catch (error) {
      throw new Error('An error occurred while registering the user');
    }
    return {
      message: 'User registered successfully',
    };
  }
}
