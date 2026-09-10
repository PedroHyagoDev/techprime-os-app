import { Module } from '@nestjs/common';
import { OrdemServicoController } from './ordem-servico.controller';
import { PrismaService } from '../infrastructure/database/prisma.service';
import { OrdemServicoPrismaRepository } from '../infrastructure/database/ordem-servico.prisma-repository';
import { PagamentoPrismaRepository } from '../infrastructure/database/pagamento.prisma-repository';
import { WhatsappAdapter } from '../infrastructure/notification/whatsapp.adapter';
import { MercadoPagoAdapter } from '../infrastructure/payment/mercado-pago.adapter';
import { TaxaArmazenagemJob } from '../infrastructure/jobs/taxa-armazenagem.job';
import { CriarOrdemServicoUseCase } from '../application/use-cases/criar-ordem-servico.usecase';
import { ListarOrdensServicoUseCase } from '../application/use-cases/listar-ordens-servico.usecase';
import { RegistrarPagamentoUseCase } from '../application/use-cases/registrar-pagamento.usecase';
import { AtualizarStatusOSUseCase } from '../application/use-cases/atualizar-status-os.usecase';
import { GerarLinkPagamentoUseCase } from '../application/use-cases/gerar-link-pagamento.usecase';

export const ORDEM_SERVICO_REPOSITORY = 'ORDEM_SERVICO_REPOSITORY';
export const PAGAMENTO_REPOSITORY = 'PAGAMENTO_REPOSITORY';
export const NOTIFIER = 'NOTIFIER';
export const PAYMENT_GATEWAY = 'PAYMENT_GATEWAY';

@Module({
    controllers: [OrdemServicoController],
    providers: [
        PrismaService,
        TaxaArmazenagemJob,
        {
            provide: ORDEM_SERVICO_REPOSITORY,
            useFactory: (prisma: PrismaService) => new OrdemServicoPrismaRepository(prisma),
            inject: [PrismaService],
        },
        {
            provide: PAGAMENTO_REPOSITORY,
            useFactory: (prisma: PrismaService) => new PagamentoPrismaRepository(prisma),
            inject: [PrismaService],
        },
        {
            provide: NOTIFIER,
            useFactory: () => new WhatsappAdapter(),
        },
        {
            provide: PAYMENT_GATEWAY,
            useFactory: () => new MercadoPagoAdapter(),
        },
        {
            provide: CriarOrdemServicoUseCase,
            useFactory: (repo: OrdemServicoPrismaRepository) => new CriarOrdemServicoUseCase(repo),
            inject: [ORDEM_SERVICO_REPOSITORY],
        },
        {
            provide: ListarOrdensServicoUseCase,
            useFactory: (repo: OrdemServicoPrismaRepository) => new ListarOrdensServicoUseCase(repo),
            inject: [ORDEM_SERVICO_REPOSITORY],
        },
        {
            provide: RegistrarPagamentoUseCase,
            useFactory: (repo: PagamentoPrismaRepository) => new RegistrarPagamentoUseCase(repo),
            inject: [PAGAMENTO_REPOSITORY],
        },
        {
            provide: AtualizarStatusOSUseCase,
            useFactory: (repo: OrdemServicoPrismaRepository, notifier: WhatsappAdapter) =>
                new AtualizarStatusOSUseCase(repo, notifier),
            inject: [ORDEM_SERVICO_REPOSITORY, NOTIFIER],
        },
        {
            provide: GerarLinkPagamentoUseCase,
            useFactory: (repo: OrdemServicoPrismaRepository, gateway: MercadoPagoAdapter) =>
                new GerarLinkPagamentoUseCase(repo, gateway),
            inject: [ORDEM_SERVICO_REPOSITORY, PAYMENT_GATEWAY],
        },
    ],
})
export class OrdemServicoModule {}