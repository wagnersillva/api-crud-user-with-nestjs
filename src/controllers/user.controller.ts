import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { UserCreateDTO } from '../dto/users/create.dto';
import { UserResponseApiDTO } from '../dto/users/response.dto';
import { UserService } from '../services/user.service';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<UserResponseApiDTO> {
    const data = await this.userService.find(id);
    return {
      status: 200,
      data 
    }
  }

  @Post('')
  @UseFilters(HttpExceptionFilter)
  async create(@Body() data: UserCreateDTO): Promise<UserResponseApiDTO> {
    return {
      status: 201,
      message: "Created",
      data: await this.userService.create(data)
    }
  }

}
