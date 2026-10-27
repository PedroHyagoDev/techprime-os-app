import { OrdemServicoRepository } from '../ports/ordem-servico.repository';
import { PaymentGateway } from '../../infrastructure/payment/payment-gateway.port';

export class GerarLinkPagamentoUseCase {
    constructor(
        private readonly repository: OrdemServicoRepository,
        private readonly gateway: PaymentGateway,
        
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