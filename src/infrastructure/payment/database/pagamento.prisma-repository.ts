import { PrismaService } from './prisma.service';
import { Pagamento } from '../../domain/entities/pagamento.entity';
import { PagamentoRepository } from '../../application/ports/pagamento.repository';
import { FormaPagamento } from '../../domain/enums/forma-pagamento.enum';
import { TipoLancamento } from '../../domain/enums/tipo-lancamento.enum';

function chavePorValor<T extends Record<string, string>>(enumObj: T, valor: string): keyof T {
    const chave = Object.keys(enumObj).find((k) => enumObj[k as keyof T] === valor);
    if (!chave) throw new Error(`Valor inválido: ${valor}`);
    return chave as keyof T;
}

export class PagamentoPrismaRepository implements PagamentoRepository {
    constructor(private readonly prisma: PrismaService) {}

    async salvar(pagamento: Pagamento): Promise<Pagamento> {
        await this.prisma.pagamento.create({
            data: {
                valor: pagamento.valor,
                data: pagamento.data,
                formaPagamento: chavePorValor(FormaPagamento, pagamento.formaPagamento) as any,
                tipoLancamento: chavePorValor(TipoLancamento, pagamento.tipoLancamento) as any,
                ordemServicoId: pagamento.ordemServicoId,
            },
        });
        // também atualiza valorTotal acumulado se você quiser somar aqui,
        // ou deixa só na consulta (recomendado, evita duplicidade de fonte de verdade)
        return pagamento;
    }

    async listarPorOrdemServico(ordemServicoId: string): Promise<Pagamento[]> {
        const registros = await this.prisma.pagamento.findMany({ where: { ordemServicoId } });
        return registros.map((r) => {
            const p = new Pagamento();
            p.valor = r.valor;
            p.data = r.data;
            p.formaPagamento = (FormaPagamento as any)[r.formaPagamento];
            p.tipoLancamento = (TipoLancamento as any)[r.tipoLancamento];
            p.ordemServicoId = r.ordemServicoId;
            return p;
        });
    }
}