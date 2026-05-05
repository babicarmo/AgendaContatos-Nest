import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, UserCreate, UserRepository } from '../users/interfaces/user.interface';

@Injectable()
export class UsersRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: UserCreate): Promise<User> {
    return this.prisma.users.create({
      data: {
        name: data.name,
        email: data.email,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.users.findUnique({
      where: { email },
    });
  }
}