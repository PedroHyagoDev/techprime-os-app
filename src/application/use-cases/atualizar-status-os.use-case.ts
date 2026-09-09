import { StatusOS } from '../../domain/enums/status-os.enum';
import { FormaContato } from '../../domain/enums/formas-contato.enum';
import { OrdemServicoRepository } from '../ports/ordem-servico.repository';
import { Notifier } from '../../infrastructure/notification/notifier.port';

export class AtualizarStatusOSUseCase {
    constructor(
        private readonly repository: OrdemServicoRepository,
        private readonly notifier: Notifier,
    ) {}

    async execute(identificador: string, novoStatus: StatusOS): Promise<void> {
        const ordem = await this.repository.buscarPorId(identificador);
        ordem.status = novoStatus;
        await this.repository.salvar(ordem);

        const dispara = novoStatus === StatusOS.EmConserto || novoStatus === StatusOS.Pronto;
        if (!dispara || ordem.formaContato !== FormaContato.WhatsApp || !ordem.whatsapp) return;

        const mensagem =
            novoStatus === StatusOS.EmConserto
                ? `Olá ${ordem.cliente}! Seu ${ordem.aparelho} (OS ${ordem.identificador}) entrou em conserto.`
                : `Olá ${ordem.cliente}! Seu ${ordem.aparelho} (OS ${ordem.identificador}) está pronto para retirada.`;

        await this.notifier.enviar(ordem.whatsapp, mensagem);
    }
}