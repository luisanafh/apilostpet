import { regularExp } from '../../../config/reggex';

export class LoginUserDto {
  private constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  static execute(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object;

    if (!email) return ['Email is required'];
    if (!password) return ['Password is required'];
    if (!regularExp.email.test(email)) return ['Email is invalid'];
    if (!regularExp.password.test(password)) {
      return ['format password is invalid'];
    }
    return [
      undefined,
      new LoginUserDto(email.trim().toLowerCase(), password.trim()),
    ];
  }
}
