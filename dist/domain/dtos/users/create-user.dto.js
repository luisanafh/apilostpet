"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
const reggex_1 = require("../../../config/reggex");
class CreateUserDto {
    constructor(name, password, email) {
        this.name = name;
        this.password = password;
        this.email = email;
    }
    static execute(object) {
        const { name, password, email } = object;
        if (!name)
            return ['name is required'];
        if (!password)
            return ['password is required'];
        if (!reggex_1.regularExp.password.test(password))
            return [
                'Password must be 8-16 characters long, contain at least one lowercase letter, one uppercase letter, and one special character',
            ];
        if (!email)
            return ['email is required'];
        if (!reggex_1.regularExp.email.test(email))
            return ['email is invalid'];
        return [
            undefined,
            new CreateUserDto(name.trim().toLowerCase(), password.trim(), email.trim().toLowerCase()),
        ];
    }
}
exports.CreateUserDto = CreateUserDto;
