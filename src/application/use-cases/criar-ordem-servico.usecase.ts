import {OrdemServico} from '../../domain/entities/ordem-servico.entity';
import { Urgencia } from '../../domain/enums/urgencia.enum';
import { StatusOS } from '../../domain/enums/status-os.enum';
import { FormaContato } from '../../domain/enums/formas-contato.enum';

interface CriarOrdemServicoRequest {
    numeroOS: string;
    cliente: string;
    aparelho: string;
    defeito: string;
    whatsapp?: string;
    email?: string;
    formaContato?: FormaContato;
    urgencia: Urgencia;
}

    export class CriarOrdemServicoUseCase {
        execute(input: CriarOrdemServicoRequest): OrdemServico {
            const ordem = new OrdemServico();
            
            ordem.identificador = input.numeroOS;
            ordem.cliente = input.cliente;
            ordem.aparelho = input.aparelho;
            ordem.defeito = input.defeito;
            ordem.urgencia = input.urgencia;
            ordem.whatsapp = input.whatsapp;
            ordem.email = input.email;
            ordem.formaContato = input.formaContato;
            ordem.status = StatusOS.Aberto;
            ordem.dataEntrada = new Date();
            


        const prazoPorUrgenciaMap: Record<Urgencia, number> = {
            [Urgencia.Baixa]: 7,
            [Urgencia.Media]: 4,
            [Urgencia.Alta]: 2,
            [Urgencia.Urgente]: 1
        };

            ordem.prazoDiasUteis = prazoPorUrgenciaMap[input.urgencia];

            return ordem;
        }
    }