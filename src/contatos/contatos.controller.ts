import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  UseGuards,
  Query // adicionei o query no import
} from '@nestjs/common';
import { ContatosService } from './contatos.service';
import { CreateContatoDto } from './dto/create-contato.dto';
import { UpdateContatoDto } from './dto/update-contato.dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('contacts')
@UseGuards(AuthGuard)
export class ContatosController {
  constructor(private readonly contatosService: ContatosService) {}

  @Post()
  create(
    @Body() createContatoDto: CreateContatoDto,
    @Headers('email') userEmail: string,
  ) {
    return this.contatosService.create(createContatoDto, userEmail);
  }

  @Get()
  findAll(@Headers('email') userEmail: string) {
    return this.contatosService.findAll(userEmail);
  }

  @Get('search')
  findByName( //adicionei findbyname para buscar por nome 
    @Query('name') name: string,
    @Headers('email') userEmail: string,
  ) {
    return this.contatosService.findByName(userEmail, name);
}

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateContatoDto: UpdateContatoDto,
  ) {
    return this.contatosService.update(id, updateContatoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contatosService.remove(id);
  }
}