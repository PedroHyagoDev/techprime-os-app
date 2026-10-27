import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { StatusOS } from '../../domain/enums/status-os.enum';

export class SalvarModeloMensagemDto {
    @IsEnum(StatusOS) status!: StatusOS;
    @IsString() @IsNotEmpty() mensagem!: string;
}