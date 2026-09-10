import { OrdemServico } from '../../domain/entities/ordem-servico.entity';
import { StatusOS } from '../../domain/enums/status-os.enum';

export interface OrdemServicoRepository {
    proximoNumero(): Promise<string>;
    salvar(ordem: OrdemServico): Promise<OrdemServico>;
    listarTodas(): Promise<OrdemServico[]>;
    buscarPorId(identificador: string): Promise<OrdemServico>;
    atualizarStatus(identificador: string, status: StatusOS): Promise<void>;
}