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
import { ModeloMensagemPrismaRepository } from '../infrastructure/database/modelo-mensagem.prisma-repository';
import { ListarModelosMensagemUseCase } from '../application/use-cases/listar-modelo-mensagem.usecase';
import { SalvarModeloMensagemUseCase } from '../application/use-cases/salvar-modelo-mensagem.usecase';
import { ModeloMensagemController } from './modelo-mensagem.controller';
export const MODELO_MENSAGEM_REPOSITORY = 'MODELO_MENSAGEM_REPOSITORY';
export const ORDEM_SERVICO_REPOSITORY = 'ORDEM_SERVICO_REPOSITORY';
export const PAGAMENTO_REPOSITORY = 'PAGAMENTO_REPOSITORY';
export const NOTIFIER = 'NOTIFIER';
export const PAYMENT_GATEWAY = 'PAYMENT_GATEWAY';

@Module({
    controllers: [OrdemServicoController, ModeloMensagemController],
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
            provide: MODELO_MENSAGEM_REPOSITORY,
            useFactory: (prisma: PrismaService) => new ModeloMensagemPrismaRepository(prisma),
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
            provide: ListarModelosMensagemUseCase,
            useFactory: (repo: ModeloMensagemPrismaRepository) => new ListarModelosMensagemUseCase(repo),
            inject: [MODELO_MENSAGEM_REPOSITORY],
        },
        {
            provide: SalvarModeloMensagemUseCase,
            useFactory: (repo: ModeloMensagemPrismaRepository) => new SalvarModeloMensagemUseCase(repo),
            inject: [MODELO_MENSAGEM_REPOSITORY],
        },
        {
            provide: RegistrarPagamentoUseCase,
            useFactory: (repo: PagamentoPrismaRepository) => new RegistrarPagamentoUseCase(repo),
            inject: [PAGAMENTO_REPOSITORY],
        },
        {
            provide: AtualizarStatusOSUseCase,
            useFactory: (repo: OrdemServicoPrismaRepository, modeloRepo: ModeloMensagemPrismaRepository) =>
                new AtualizarStatusOSUseCase(repo, modeloRepo),
            inject: [ORDEM_SERVICO_REPOSITORY, MODELO_MENSAGEM_REPOSITORY],
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