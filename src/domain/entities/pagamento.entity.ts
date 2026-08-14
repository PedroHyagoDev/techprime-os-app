import { FormaPagamento } from '../enums/forma-pagamento.enum';
import { TipoLancamento } from '../enums/tipo-lancamento.enum';

export class Pagamento {
    valor!: number;
    data!: Date;
    formaPagamento!: FormaPagamento;
    tipoLancamento!: TipoLancamento;
    ordemServicoId!: string;
}