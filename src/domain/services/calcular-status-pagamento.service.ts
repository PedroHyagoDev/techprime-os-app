import { Pagamento } from '../entities/pagamento.entity';
import { StatusPagamento } from '../enums/status-pagamento.enum';

export function calcularStatusPagamento(
    valorTotal: number,
    pagamentos: Pagamento[],
): StatusPagamento {
    const totalPago = pagamentos.reduce((soma, p) => soma + p.valor, 0);

    if (totalPago <= 0) return StatusPagamento.Pendente;
    if (totalPago >= valorTotal) return StatusPagamento.Pago;
    return StatusPagamento.Parcial;
}