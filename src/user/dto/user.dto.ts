import { IsEmail, IsIn, IsNotEmpty, IsString } from "class-validator";
import { Role } from "../enums";

export class UserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsIn([Role.Admin, Role.User])
    @IsString()
    role: Role;
}