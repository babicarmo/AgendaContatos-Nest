import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ContatosRepository } from './contatos.repository';
import { UsersService } from '../users/users.service';
import { CreateContatoDto } from './dto/create-contato.dto';
import { UpdateContatoDto } from './dto/update-contato.dto';
import { Contact } from './interfaces/contato.interface';

@Injectable()
export class ContatosService {
  constructor(
    private readonly contatosRepository: ContatosRepository,
    private readonly usersService: UsersService,
  ) {}

  async create(createContatoDto: CreateContatoDto, userEmail: string): Promise<Contact> {
    const { name, email, phone } = createContatoDto;

    const user = await this.usersService.findByEmail(userEmail);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const contactExists = await this.contatosRepository.findByEmailOrPhone(email, phone);
    if (contactExists) {
      throw new BadRequestException('Já existe um contato com este e-mail ou telefone.');
    }

    return this.contatosRepository.create({
      name,
      email,
      phone,
      userId: user.id,
    });
  }

  async findAll(userEmail: string): Promise<Contact[]> {
    const user = await this.usersService.findByEmail(userEmail);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return this.contatosRepository.findAllContacts(user.id);
  }
  async findByName(userEmail: string, name: string): Promise<Contact[]> {
    const user = await this.usersService.findByEmail(userEmail);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.contatosRepository.findByName(user.id, name);
  }

  async update(id: string, updateContatoDto: UpdateContatoDto): Promise<Contact> {
    const { name, email, phone } = updateContatoDto;

    return this.contatosRepository.updateContact({
      id,
      name: name ?? '',
      email: email ?? '',
      phone: phone ?? '',
    });
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.contatosRepository.delete(id);
    if (!result) {
      throw new BadRequestException('Falha ao excluir o contato');
    }
    return true;
  }
}