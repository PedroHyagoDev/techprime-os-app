import { StatusOS } from '../../domain/enums/status-os.enum';
import { FormaContato } from '../../domain/enums/formas-contato.enum';
import { OrdemServicoRepository } from '../ports/ordem-servico.repository';
import { ModeloMensagemRepository } from '../ports/modelo-mensagem.repository';
import { preencherModelo } from '../../domain/services/preencher-modelo.service';
import { gerarLinkWhatsapp } from '../../domain/services/gerar-link-whatsapp.service';

export class AtualizarStatusOSUseCase {
    constructor(
        private readonly repository: OrdemServicoRepository,
        private readonly modeloRepository: ModeloMensagemRepository,
    ) {}

    async execute(identificador: string, novoStatus: StatusOS): Promise<{ linkWhatsapp: string | null }> {
        const ordem = await this.repository.buscarPorId(identificador);
        ordem.status = novoStatus;
        await this.repository.salvar(ordem);

        if (ordem.formaContato !== FormaContato.WhatsApp || !ordem.whatsapp) return { linkWhatsapp: null };

        const modelo = await this.modeloRepository.buscarPorStatus(novoStatus);
        if (!modelo) return { linkWhatsapp: null };

        const mensagem = preencherModelo(modelo.mensagem, {
            cliente: ordem.cliente,
            aparelho: ordem.aparelho,
            identificador: ordem.identificador,
            defeito: ordem.defeito,
            valorTotal: ordem.valorTotal.toFixed(2).replace('.', ','),
        });

        return { linkWhatsapp: gerarLinkWhatsapp(ordem.whatsapp, mensagem) };
    }
}