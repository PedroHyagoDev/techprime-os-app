import { ModeloMensagem } from '../../domain/entities/modelo-mensagem.entity';
import { StatusOS } from '../../domain/enums/status-os.enum';
import { ModeloMensagemRepository } from '../ports/modelo-mensagem.repository';

export class SalvarModeloMensagemUseCase {
    constructor(private readonly repository: ModeloMensagemRepository) {}

    async execute(status: StatusOS, mensagem: string): Promise<ModeloMensagem> {
        const modelo = new ModeloMensagem();
        modelo.status = status;
        modelo.mensagem = mensagem;
        return this.repository.salvar(modelo);
    }
}