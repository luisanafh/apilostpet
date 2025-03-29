import { encriptAdapter, envs } from '../../../config';
import { JwtAdapter } from '../../../config/jwt.adapter';
import { User, UserStatus } from '../../../data/postgres/models/user.model';
import { CustomError, LoginUserDto } from '../../../domain';

export class LoginUserService {
  async execute(credentials: LoginUserDto) {
    try {
      const user = await this.ensureUserExists(credentials.email);
      await this.ensurePasswordIsCorrect(credentials.password, user.password);

      const token = await this.generateToken(
        { id: user.id, role: user.role },
        envs.JWT_EXPIRE_IN
      );

      return {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      };
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer('Login process failed');
    }
  }

  private async ensureUserExists(email: string) {
    const user = await User.findOne({
      where: {
        email: email,
        status: UserStatus.ACTIVE,
      },
      select: ['id', 'name', 'email', 'role', 'password', 'status'],
    });

    if (!user) {
      throw CustomError.unAutorized('Invalid credentials');
    }

    return user;
  }

  private async ensurePasswordIsCorrect(
    unHashedPassword: string,
    hashedPassword: string
  ) {
    try {
      const isMatch = await encriptAdapter.compare(
        unHashedPassword,
        hashedPassword
      );
      if (!isMatch) {
        throw CustomError.unAutorized('Invalid credentials');
      }
    } catch (error) {
      throw CustomError.unAutorized('Could not verify password');
    }
  }

  private async generateToken(payload: any, duration: string) {
    try {
      return await JwtAdapter.generateToken(payload, duration);
    } catch (error) {
      throw CustomError.internalServer('Error generating token');
    }
  }
}
