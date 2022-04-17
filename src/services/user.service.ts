import { Injectable, Inject, HttpException, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { UserCreateDTO } from 'src/dto/users/create.dto';
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

  async find(id: number): Promise<UserDTO> {
      return this.transformToDTO(await this.repositoy.findOneOrFail(id))
  }

  async findAll(): Promise<UserDTO[]> {
    const users = await this.repositoy.find();
    const usersToDTO = users.map( user => this.transformToDTO(user))
    return usersToDTO
  }

  async findByEmail(email: string): Promise<UserDTO>{
    const user = await this.repositoy.findOne({ where: { email } })
    return this.transformToDTO(user)
  }

  async findByEmailAndFirstname(email: string, firstName: string): Promise<UserDTO>{
    const user = await this.repositoy.findOne({ where: { email, firstName } })
    return this.transformToDTO(user)
  }

  async create(data: UserCreateDTO): Promise<UserDTO>{
      const userData = { 
        age: new Date(data.age), 
        ...data 
      }

      try {
        const user = await this.repositoy.save(userData);
        return this.transformToDTO(user);
      } catch(err) {
        throw new InternalServerErrorException( err.sqlMessage || "Erro ao tentar criar usuário");
      }
      
  }

}