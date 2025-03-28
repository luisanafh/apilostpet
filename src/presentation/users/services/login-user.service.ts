import { encriptAdapter, envs } from '../../../config';
import { JwtAdapter } from '../../../config/jwt.adapter';
import { User, UserStatus } from '../../../data/postgres/models/user.model';
import { CustomError, LoginUserDto } from '../../../domain';

export class LoginUserService {
  async execute(credentials: LoginUserDto) {
    const user = await this.ensureUserExists(credentials.email);

    this.ensurePasswordIsCorrect(credentials.password, user!.password);

    const token = await this.generateToken(
      { id: user!.id },
      envs.JWT_EXPIRE_IN
    );

    return {
      token,
      user: {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        rol: user?.role,
      },
    };
  }

  private ensureUserExists(email: string) {
    const user = User.findOne({
      where: {
        email: email,
        status: UserStatus.ACTIVE,
      },
    });

    if (!user) {
      throw CustomError.notFound('User not found');
    }

    return user;
  }

  private ensurePasswordIsCorrect(
    unHashedPassword: string,
    hashedPassword: string
  ) {
    const isMatch = encriptAdapter.compare(unHashedPassword, hashedPassword);

    if (!isMatch) {
      throw CustomError.unAutorized('Invalid credentials');
    }
  }

  private async generateToken(payload: any, duration: string) {
    const token = await JwtAdapter.generateToken(payload, duration);
    if (!token) throw CustomError.internalServer('Error while creating JWT');
    return token;
  }
}
