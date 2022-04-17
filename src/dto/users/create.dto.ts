import { IsString, IsEmail, IsDateString, IsOptional } from 'class-validator';

interface UserCreateInterfaceDTO {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    age: Date
}

export class UserCreateDTO implements UserCreateInterfaceDTO {

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsDateString()
    age: Date

}