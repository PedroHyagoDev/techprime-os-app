import { Body, Controller, Get, Post } from '@nestjs/common';
import { CriarOrdemServicoUseCase } from '../application/use-cases/criar-ordem-servico.usecase';
import { ListarOrdensServicoUseCase } from '../application/use-cases/listar-ordens-servico.usecase';
import { CriarOrdemServicoDto } from './dto/criar-ordem-servico.dto';

@Controller('ordens-servico')
export class OrdemServicoController {
    constructor(
        private readonly criarUseCase: CriarOrdemServicoUseCase,
        private readonly listarUseCase: ListarOrdensServicoUseCase,
    ) {}

    @Post()
    criar(@Body() dto: CriarOrdemServicoDto) {
        return this.criarUseCase.execute(dto);
    }

    @Get()
    listar() {
        return this.listarUseCase.execute();
    }
}