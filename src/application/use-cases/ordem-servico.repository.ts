import { OrdemServico } from '../../domain/entities/ordem-servico.entity';

export interface OrdemServicoRepository {
    proximoNumero(): Promise<string>;
    salvar(ordem: OrdemServico): Promise<OrdemServico>;
    listarTodas(): Promise<OrdemServico[]>;
}