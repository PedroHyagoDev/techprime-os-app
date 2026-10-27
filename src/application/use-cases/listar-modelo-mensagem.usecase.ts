import { ModeloMensagem } from '../../domain/entities/modelo-mensagem.entity';
import { ModeloMensagemRepository } from '../ports/modelo-mensagem.repository';

export class ListarModelosMensagemUseCase {
    constructor(private readonly repository: ModeloMensagemRepository) {}

    async execute(): Promise<ModeloMensagem[]> {
        return this.repository.listarTodos();
    }
}