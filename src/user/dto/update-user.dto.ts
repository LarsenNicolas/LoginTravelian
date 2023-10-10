import { IsEmail, MaxLength, MinLength, NotEquals } from "class-validator";

export class UpdateUserDto {
    @IsEmail()
    email: string;

    @MinLength(4)
    @MaxLength(20)
    password: string;

    @MinLength(4)
    @MaxLength(20)
    @NotEquals('password')
    newPassword: string;
}
