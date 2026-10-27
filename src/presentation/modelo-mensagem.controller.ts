import { Body, Controller, Get, Put } from '@nestjs/common';
import { ListarModelosMensagemUseCase } from '../application/use-cases/listar-modelo-mensagem.usecase';
import { SalvarModeloMensagemUseCase } from '../application/use-cases/salvar-modelo-mensagem.usecase';
import { SalvarModeloMensagemDto } from './dto/salvar-modelo-mensagem.dto';

@Controller('modelos-mensagem')
export class ModeloMensagemController {
    constructor(
        private readonly listarUseCase: ListarModelosMensagemUseCase,
        private readonly salvarUseCase: SalvarModeloMensagemUseCase,
    ) {}

    @Get()
    listar() {
        return this.listarUseCase.execute();
    }

    @Put()
    salvar(@Body() dto: SalvarModeloMensagemDto) {
        return this.salvarUseCase.execute(dto.status, dto.mensagem);
    }
}