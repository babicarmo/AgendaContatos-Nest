import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, email } = createUserDto;

    const userExists = await this.usersRepository.findByEmail(email);
    if (userExists) {
      throw new BadRequestException('O usuário já existe');
    }

    return this.usersRepository.create({ name, email });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }
}