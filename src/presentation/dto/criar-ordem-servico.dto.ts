import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { Urgencia } from '../../domain/enums/urgencia.enum';
import { FormaContato } from '../../domain/enums/formas-contato.enum';

export class CriarOrdemServicoDto {
    @IsString() @IsNotEmpty() cliente!: string;
    @IsString() @IsNotEmpty() aparelho!: string;
    @IsString() @IsNotEmpty() defeito!: string;
    @IsEnum(Urgencia) urgencia!: Urgencia;
    @IsOptional() @IsString() numeroOS?: string;
    @IsOptional() @IsString() whatsapp?: string;
    @IsOptional() @IsString() email?: string;
    @IsOptional() @IsEnum(FormaContato) formaContato?: FormaContato;
}