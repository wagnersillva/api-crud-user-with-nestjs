import { Injectable, Inject, HttpException, HttpStatus, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ApiResponseDTO } from 'src/dto/api/response.dto';
import { UserCreateDTO } from 'src/dto/users/create.dto';
import { UserResponseApiDTO } from 'src/dto/users/response.dto';
import { UserUpdateDTO } from 'src/dto/users/update.dto';
import { UserDTO } from 'src/dto/users/user.dto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { ServiceClassInterface } from './service.interface';

@Injectable()
export class UserService implements ServiceClassInterface {
  constructor(
    @Inject('USER_REPOSITORY')
    private repositoy: Repository<User>,
  ) {}

  transformToDTO = (user: User): UserDTO =>  new UserDTO(user)

  formatResponse = (data: UserDTO | UserDTO[]) => ({data})

  async find(id: number): Promise<UserResponseApiDTO> {
    try {
      const data = await this.repositoy.findOneOrFail(id)
      const user = this.transformToDTO(data)
      return this.formatResponse(user)
    } catch (e) {
      throw new NotFoundException("Nenhum usuario foi encontrado");
    }
  }

  async findAll(): Promise<UserResponseApiDTO> {
    const data = await this.repositoy.find();
    const users  = data.map( user => this.transformToDTO(user))
    return this.formatResponse(users)
  }

  async findByEmail(email: string): Promise<UserResponseApiDTO>{
    try {
      const data = await this.repositoy.findOne({ where: { email } })
      const user =  this.transformToDTO(data)
      return this.formatResponse(user)
    } catch(e){
      throw new NotFoundException(`Nenhum usario encontrado com o email: ${email}`);
    }
  }

  async findByEmailAndFirstname(email: string, firstName: string): Promise<UserResponseApiDTO>{
    try {
      const data = await this.repositoy.findOne({ where: { email, firstName } })
      const user =  this.transformToDTO(data)
      return this.formatResponse(user)
    } catch(e){
      throw new NotFoundException(`Nenhum usario encontrado com o email: ${email} e o primeiro nome: ${firstName}`);
    }
  }

  async create(data: UserCreateDTO): Promise<UserResponseApiDTO>{
    const userData = { 
      age: new Date(data.age), 
      ...data 
    }

    try {
      const data = await this.repositoy.save(userData);
      const user = this.transformToDTO(data)
      return this.formatResponse(user)
    } catch(err) {
      throw new InternalServerErrorException( err.sqlMessage || "Erro ao tentar criar usuário");
    }

  }

  async update(id: number, body: UserUpdateDTO): Promise<UserResponseApiDTO>{
    try {
      const data = await this.repositoy.update(id, body)
      return data && await this.find(id)
    } catch(err) {
      throw new InternalServerErrorException( err.sqlMessage || "Erro ao tentar editar usuário");
    } 
  }
  
  async destroy(id: number): Promise<UserResponseApiDTO>{
    try {
      const data = await this.repositoy.findOneOrFail(id)
      const deleted = await this.repositoy.delete(id)
      return deleted && {
        message: `User ${data.firstName} deleted`
      }
    } catch(err) {
      throw new InternalServerErrorException( err.sqlMessage || "Erro ao tentar deletar usuário");
    } 
  }

}