
import { Pagamento } from './pagamento.entity';
import {FormaContato} from '../enums/formas-contato.enum';
import { Urgencia } from '../enums/urgencia.enum';
import { StatusOS } from '../enums/status-os.enum';
export class OrdemServico {
    identificador!:string;
    cliente!:string;
    aparelho!:string;
    defeito!:string;
    whatsapp?:string;
    email?:string;
    formaContato?:FormaContato;
    urgencia!: Urgencia;
    status!: StatusOS;
    prazoDiasUteis!:number;
    valorTotal!:number;
    dataEntrada!:Date;
    dataAvaliacao?:Date;
    dataUltimoContato?:Date;
    pagamentos?: Pagamento[];
}