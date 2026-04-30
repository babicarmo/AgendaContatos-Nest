import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { ContatosService } from './contatos.service';
import { CreateContatoDto } from './dto/create-contato.dto';
import { UpdateContatoDto } from './dto/update-contato.dto';
import { AuthGuard } from 'src/auth/guard';

@Controller('contatos')
@UseGuards(AuthGuard)
export class ContatosController {
  constructor(private readonly contatosService: ContatosService) {}

  @Post()
  create(@Body() dto: CreateContatoDto, @Request() req) {
    return this.contatosService.create(dto, req.user.id);
  }

  @Get()
  findAll(@Request() req) {
    return this.contatosService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contatosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateContatoDto) {
    return this.contatosService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contatosService.remove(id);
  }
}