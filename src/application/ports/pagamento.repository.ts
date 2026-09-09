import { Pagamento } from '../../domain/entities/pagamento.entity';

export interface PagamentoRepository {
    salvar(pagamento: Pagamento): Promise<Pagamento>;
    listarPorOrdemServico(ordemServicoId: string): Promise<Pagamento[]>;
}