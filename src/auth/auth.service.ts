import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, senha: string) {
    const usuario = await this.prisma.usuario.findUnique({ where: { email } });

    if (!usuario) throw new UnauthorizedException('Email ou senha inválidos');

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) throw new UnauthorizedException('Email ou senha inválidos');

    const payload = { id: usuario.id, email: usuario.email };
    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }

  async registrar(nome: string, email: string, senha: string) {
    const senhaHash = await bcrypt.hash(senha, 10);

    return this.prisma.usuario.create({
      data: { nome, email, senha: senhaHash },
    });
  }
}