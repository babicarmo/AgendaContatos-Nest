import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../../users/users.service';

// Criação do Guard de autenticação
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}
  
 // Método obrigatório do CanActivate
  // Ele decide se a requisição pode continuar ou não

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const email = request.headers['email'] as string;

    if (!email) {
      throw new UnauthorizedException('Email é necessário para a consulta');
    }

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    request.authenticatedUser = user;
    return true;
  }
}