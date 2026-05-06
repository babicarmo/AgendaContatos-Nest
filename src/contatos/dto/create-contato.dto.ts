import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

// Validação dos campos com class-validator
// adicionei decorators nos dtos para garantir os dados enviados são válidos
export class CreateContatoDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Telefone muito curto' })
  phone: string;
}