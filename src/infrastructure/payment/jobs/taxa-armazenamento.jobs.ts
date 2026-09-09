import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../database/prisma.service';
import { StatusOS } from '../../domain/enums/status-os.enum';
import { TipoLancamento } from '../../domain/enums/tipo-lancamento.enum';
import { FormaPagamento } from '../../domain/enums/forma-pagamento.enum';

@Injectable()
export class TaxaArmazenagemJob {
    constructor(private readonly prisma: PrismaService) {}

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async executar() {
        const ordens = await this.prisma.ordemServico.findMany({
            where: {
                dataAvaliacao: { not: null },
                status: { in: ['Pronto', 'SemSolucao'] },
            },
        });

        const hoje = new Date();

        for (const ordem of ordens) {
            const diasDesdeAvaliacao = Math.floor(
                (hoje.getTime() - ordem.dataAvaliacao!.getTime()) / (1000 * 60 * 60 * 24),
            ) + 1; // dia da avaliação conta como dia 1

            if (diasDesdeAvaliacao <= 30) continue;

            const valor = ordem.status === 'Pronto' ? 3 : 5;

            await this.prisma.pagamento.create({
                data: {
                    valor,
                    formaPagamento: FormaPagamento.Dinheiro as any, // placeholder, é taxa não é pagamento real
                    tipoLancamento: 'TaxaArmazenagem' as any,
                    ordemServicoId: ordem.identificador,
                },
            });

            // aqui você chama o notifier pra avisar o cliente da taxa (opcional, mesmo Adapter do item 5)
        }
    }
}