import { Pagamento } from '../../domain/entities/pagamento.entity';
import { FormaPagamento } from '../../domain/enums/forma-pagamento.enum';
import { TipoLancamento } from '../../domain/enums/tipo-lancamento.enum';
import { PagamentoRepository } from '../ports/pagamento.repository';

interface RegistrarPagamentoRequest {
    ordemServicoId: string;
    valor: number;
    formaPagamento: FormaPagamento;
    tipoLancamento: TipoLancamento;
}

export class RegistrarPagamentoUseCase {
    constructor(private readonly repository: PagamentoRepository) {}

    async execute(input: RegistrarPagamentoRequest): Promise<Pagamento> {
        const pagamento = new Pagamento();
        pagamento.ordemServicoId = input.ordemServicoId;
        pagamento.valor = input.valor;
        pagamento.formaPagamento = input.formaPagamento;
        pagamento.tipoLancamento = input.tipoLancamento;
        pagamento.data = new Date();

        return this.repository.salvar(pagamento);
    }
}