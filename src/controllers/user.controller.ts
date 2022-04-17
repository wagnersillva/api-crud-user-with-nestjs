import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseFilters } from '@nestjs/common';
import { ApiResponseDTO } from 'src/dto/api/response.dto';
import { UserUpdateDTO } from 'src/dto/users/update.dto';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { UserCreateDTO } from '../dto/users/create.dto';
import { UserResponseApiDTO } from '../dto/users/response.dto';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async findAll():Promise<UserResponseApiDTO> {
    return await this.userService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<UserResponseApiDTO> {
    return await this.userService.find(id);
  }

  @Post('')
  @UseFilters(HttpExceptionFilter)
  async create(@Body() data: UserCreateDTO): Promise<UserResponseApiDTO> {
    return await this.userService.create(data)
  }

  @Put(':id')
  @UseFilters(HttpExceptionFilter)
  async update(@Param('id', new ParseIntPipe()) id: number, @Body() data: UserUpdateDTO): Promise<UserResponseApiDTO> {
    if(!data|| !Object.keys(data).length) throw new BadRequestException("Nenhum dado foi enviado");

    return await this.userService.update(id, data)
  }
  
  @Delete(':id')
  @UseFilters(HttpExceptionFilter)
  async destroy(@Param('id', new ParseIntPipe()) id: number): Promise<UserResponseApiDTO> {
    return await this.userService.destroy(id)
  }


}
