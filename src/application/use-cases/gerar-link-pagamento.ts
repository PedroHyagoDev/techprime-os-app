import { MercadoPagoAdapter } from '../../infrastructure/payment/mercado-pago.adapter';
import { OrdemServicoRepository } from '../ports/ordem-servico.repository';

export class GerarLinkPagamentoUseCase {
    constructor(
        private readonly repository: OrdemServicoRepository,
        private readonly gateway: MercadoPagoAdapter,
    ) {}

    async execute(ordemServicoId: string): Promise<string> {
        const ordem = await this.repository.buscarPorId(ordemServicoId);
        return this.gateway.gerarLink(
            ordem.identificador,
            ordem.valorTotal,
            `OS ${ordem.identificador} - ${ordem.aparelho}`,
        );
    }
}