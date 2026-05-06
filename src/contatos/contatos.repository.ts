import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  Contact,
  ContactCreateData,
  ContactRepository,
} from '../contatos/interfaces/contato.interface';

@Injectable()
export class ContatosRepository implements ContactRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: ContactCreateData): Promise<Contact> {
    return this.prisma.contacts.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        userId: data.userId,
      },
    });
  }

  async findByEmailOrPhone(email: string, phone: string): Promise<Contact | null> {
    return this.prisma.contacts.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });
  }

  async findAllContacts(userId: string): Promise<Contact[]> {
    return this.prisma.contacts.findMany({
      where: { userId },
      orderBy: { //acrescentei um método de ordenação alfabética, ou seja, em ordem alfabética.
        name:"asc",
      }
    });
  }

  async updateContact({ id, name, email, phone }: Contact): Promise<Contact> {
    return this.prisma.contacts.update({
      where: { id },
      data: { name, email, phone },
    });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.prisma.contacts.delete({ where: { id } });
    return !!result;
  }
// filtra os contatos do usuário por nome 
  async findByName(userId: string, name: string): Promise<Contact[]> {
  return this.prisma.contacts.findMany({
    where: {
      userId,
      name: {
        contains: name,
      },
    },
  });
  }
}