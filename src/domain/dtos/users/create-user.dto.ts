import { regularExp } from '../../../config/reggex';

export class CreateUserDto {
  constructor(
    public name: string,
    public password: string,
    public email: string
  ) {}

  static execute(object: { [key: string]: any }): [string?, CreateUserDto?] {
    const { name, password, email } = object;

    if (!name) return ['name is required'];
    if (!password) return ['password is required'];
    if (!regularExp.password.test(password))
      return ['format password is invalid'];
    if (!email) return ['email is required'];
    if (!regularExp.email.test(email)) return ['email is invalid'];

    return [
      undefined,
      new CreateUserDto(
        name.trim().toLowerCase(),
        password.trim(),
        email.trim().toLowerCase()
      ),
    ];
  }
}
