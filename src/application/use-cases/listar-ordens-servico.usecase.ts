import { OrdemServico } from '../../domain/entities/ordem-servico.entity';
import { OrdemServicoRepository } from '../ports/ordem-servico.repository';

export class ListarOrdensServicoUseCase {
    constructor(private readonly repository: OrdemServicoRepository) {}

    async execute(): Promise<OrdemServico[]> {
        return this.repository.listarTodas();
    }
}