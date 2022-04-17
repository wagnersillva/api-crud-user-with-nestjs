import { IsString, IsEmail, IsDateString, IsOptional } from 'class-validator';

interface UserUpdateInterfaceDTO {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    age: Date
}

export class UserUpdateDTO implements UserUpdateInterfaceDTO {

    @IsOptional()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    lastName: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    password: string;

    @IsOptional()
    @IsDateString()
    age: Date

}