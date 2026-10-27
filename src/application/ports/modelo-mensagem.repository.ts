import { ModeloMensagem } from '../../domain/entities/modelo-mensagem.entity';
import { StatusOS } from '../../domain/enums/status-os.enum';

export interface ModeloMensagemRepository {
    buscarPorStatus(status: StatusOS): Promise<ModeloMensagem | null>;
    salvar(modelo: ModeloMensagem): Promise<ModeloMensagem>;
    listarTodos(): Promise<ModeloMensagem[]>;
}