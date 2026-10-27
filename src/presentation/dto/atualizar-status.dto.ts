import { IsEnum } from 'class-validator';
import { StatusOS } from '../../domain/enums/status-os.enum';


export class AtualizarStatusDto {
    @IsEnum(StatusOS) status!: StatusOS;
}