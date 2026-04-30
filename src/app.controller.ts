import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // isso é só pra saber se a API tá funcionando
  getHello(): string {
    return this.appService.getHello();
  }
}
