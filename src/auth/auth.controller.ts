import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() body: { email: string; senha: string }) {
    return this.authService.login(body.email, body.senha);
  }

  @Post('registrar')
  registrar(@Body() body: { nome: string; email: string; senha: string }) {
    return this.authService.registrar(body.nome, body.email, body.senha);
  }
}