import {IsEmail, IsNotEmpty, IsString, MinLength} from 'class-validator';

export class CreateContatoDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;

  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Telefone muito curto' })
  telefone: string;
}

//IsEmail, IsNotEmpty, IsString, MinLength