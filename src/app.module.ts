import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ContatosModule } from './contatos/contatos.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, ContatosModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}