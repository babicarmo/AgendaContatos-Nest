import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContatoDto } from './dto/create-contato.dto';
import { UpdateContatoDto } from './dto/update-contato.dto';

@Injectable()
export class ContatosService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateContatoDto, usuarioId: string) {
    const jaExiste = await this.prisma.contato.findFirst({
      where: { email: dto.email },
    });

    if (jaExiste) throw new ConflictException('Email já cadastrado');

    return this.prisma.contato.create({
      data: { ...dto, usuarioId },
    });
  }

  async findAll(usuarioId: string) {
    return this.prisma.contato.findMany({
      where: { usuarioId },
    });
  }

  async findOne(id: string) {
    const contato = await this.prisma.contato.findUnique({
      where: { id },
    });

    if (!contato) throw new NotFoundException(`Contato ${id} não encontrado`);

    return contato;
  }

  async update(id: string, dto: UpdateContatoDto) {
    await this.findOne(id);

    return this.prisma.contato.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.contato.delete({ where: { id } });

    return { mensagem: 'Contato removido com sucesso' };
  }
}