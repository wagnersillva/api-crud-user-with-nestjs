
import { UserCreateDTO } from 'src/dto/users/create.dto';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: "users" })
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 500 })
  password: string;

  @Column()
  age: Date

}