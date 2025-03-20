import { regularExp } from '../../../config/reggex';

export class UpdateUserDto {
  constructor(public name: string, public email: string) {}

  static execute(object: { [key: string]: any }): [string?, UpdateUserDto?] {
    const { name, email } = object;

    if (!name) return ['name is required'];
    if (!email) return ['email is required'];
    if (!regularExp.email.test(email)) return ['email is invalid'];

    return [
      undefined,
      new UpdateUserDto(name.trim().toLowerCase(), email.trim().toLowerCase()),
    ];
  }
}
