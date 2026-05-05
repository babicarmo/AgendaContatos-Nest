import { Module } from '@nestjs/common';
import { ContatosController } from './contatos.controller';
import { ContatosService } from './contatos.service';
import { ContatosRepository } from './contatos.repository';
import { AuthGuard } from './guards/auth.guard';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [ContatosController],
  providers: [ContatosService, ContatosRepository, AuthGuard],
})
export class ContatosModule {}