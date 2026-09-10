import { OrdemServico } from '../../domain/entities/ordem-servico.entity';
import { Urgencia } from '../../domain/enums/urgencia.enum';
import { StatusOS } from '../../domain/enums/status-os.enum';
import { FormaContato } from '../../domain/enums/formas-contato.enum';
import { OrdemServicoRepository } from '../ports/ordem-servico.repository';

interface CriarOrdemServicoRequest {
    numeroOS?: string;
    cliente: string;
    aparelho: string;
    defeito: string;
    whatsapp?: string;
    email?: string;
    formaContato?: FormaContato;
    urgencia: Urgencia;
}

const prazoPorUrgenciaMap: Record<Urgencia, number> = {
    [Urgencia.Baixa]: 7,
    [Urgencia.Media]: 5,
    [Urgencia.Alta]: 3,
    [Urgencia.Urgente]: 1,
};

export class CriarOrdemServicoUseCase {
    constructor(private readonly repository: OrdemServicoRepository) {}

    async execute(input: CriarOrdemServicoRequest): Promise<OrdemServico> {
        const ordem = new OrdemServico();

        ordem.identificador = input.numeroOS ?? (await this.repository.proximoNumero());
        ordem.cliente = input.cliente;
        ordem.aparelho = input.aparelho;
        ordem.defeito = input.defeito;
        ordem.urgencia = input.urgencia;
        ordem.whatsapp = input.whatsapp;
        ordem.email = input.email;
        ordem.formaContato = input.formaContato;
        ordem.status = StatusOS.Aberto;
        ordem.dataEntrada = new Date();
        ordem.valorTotal = 0;
        ordem.prazoDiasUteis = prazoPorUrgenciaMap[input.urgencia];

        return this.repository.salvar(ordem);
    }
}