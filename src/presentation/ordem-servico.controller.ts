    
    import { AtualizarStatusOSUseCase } from '../application/use-cases/atualizar-status-os.usecase';
    import { AtualizarStatusDto } from './dto/atualizar-status.dto';
    import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
    import { ListarOrdensServicoUseCase } from 'src/application/use-cases/listar-ordens-servico.usecase';
    import { CriarOrdemServicoUseCase } from 'src/application/use-cases/criar-ordem-servico.usecase';
    import { CriarOrdemServicoDto } from './dto/criar-ordem-servico.dto';
    import { GerarLinkPagamentoUseCase } from 'src/application/use-cases/gerar-link-pagamento.usecase';


    @Controller('ordens-servico')
    export class OrdemServicoController {
        constructor(
            private readonly criarUseCase: CriarOrdemServicoUseCase,
            private readonly listarUseCase: ListarOrdensServicoUseCase,
            private readonly atualizarStatusUseCase: AtualizarStatusOSUseCase,
            private readonly gerarLinkUseCase: GerarLinkPagamentoUseCase
        ) {}
                    @Post()
        criar(@Body() dto: CriarOrdemServicoDto) {
            return this.criarUseCase.execute(dto);
        }
           
        @Post(':id/link-pagamento')
           
    async gerarLinkPagamento(@Param('id') id: string) {
        const link = await this.gerarLinkUseCase.execute(id);
        return { link };
    }

        @Get()
        listar() {
            return this.listarUseCase.execute();
        }
      @Patch(':id/status')
    async atualizarStatus(@Param('id') id: string, @Body() dto: AtualizarStatusDto) {
        const { linkWhatsapp } = await this.atualizarStatusUseCase.execute(id, dto.status);
        return { sucesso: true, linkWhatsapp };
    }
    }