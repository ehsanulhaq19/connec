import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../repositories/users.repository';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: any): Promise<User> {
    return this.usersRepository.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findById(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findByEmail(email);
  }

  async update(id: string, updateUserDto: any): Promise<User> {
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<User> {
    return this.usersRepository.remove(id);
  }
} 