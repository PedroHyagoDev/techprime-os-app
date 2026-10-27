import { PrismaService } from './prisma.service';
import { OrdemServico } from '../../domain/entities/ordem-servico.entity';
import { OrdemServicoRepository } from '../../application/ports/ordem-servico.repository';
import { Urgencia } from '../../domain/enums/urgencia.enum';
import { StatusOS } from '../../domain/enums/status-os.enum';
import { FormaContato } from '../../domain/enums/formas-contato.enum';

function chavePorValor<T extends Record<string, string>>(enumObj: T, valor: string): keyof T {
    const chave = Object.keys(enumObj).find((k) => enumObj[k as keyof T] === valor);
    if (!chave) throw new Error(`Valor inválido: ${valor}`);
    return chave as keyof T;
}

function paraEntidade(r: any): OrdemServico {
    const ordem = new OrdemServico();
    ordem.identificador = r.identificador;
    ordem.cliente = r.cliente;
    ordem.aparelho = r.aparelho;
    ordem.defeito = r.defeito;
    ordem.whatsapp = r.whatsapp ?? undefined;
    ordem.email = r.email ?? undefined;
    ordem.formaContato = r.formaContato ? (FormaContato as any)[r.formaContato] : undefined;
    ordem.urgencia = (Urgencia as any)[r.urgencia];
    ordem.status = (StatusOS as any)[r.status];
    ordem.prazoDiasUteis = r.prazoDiasUteis;
    ordem.valorTotal = r.valorTotal;
    ordem.dataEntrada = r.dataEntrada;
    ordem.dataAvaliacao = r.dataAvaliacao ?? undefined;
    ordem.dataUltimoContato = r.dataUltimoContato ?? undefined;
    return ordem;
}

export class OrdemServicoPrismaRepository implements OrdemServicoRepository {
    constructor(private readonly prisma: PrismaService) {}

    async proximoNumero(): Promise<string> {
        const total = await this.prisma.ordemServico.count();
        return String(total + 1).padStart(5, '0');
    }

    async salvar(ordem: OrdemServico): Promise<OrdemServico> {
        await this.prisma.ordemServico.upsert({
            where: { identificador: ordem.identificador },
            create: {
                identificador: ordem.identificador,
                cliente: ordem.cliente,
                aparelho: ordem.aparelho,
                defeito: ordem.defeito,
                whatsapp: ordem.whatsapp,
                email: ordem.email,
                formaContato: ordem.formaContato
                    ? (chavePorValor(FormaContato, ordem.formaContato) as any)
                    : undefined,
                urgencia: chavePorValor(Urgencia, ordem.urgencia) as any,
                status: chavePorValor(StatusOS, ordem.status) as any,
                prazoDiasUteis: ordem.prazoDiasUteis,
                valorTotal: ordem.valorTotal,
                dataEntrada: ordem.dataEntrada,
            },
            update: {
                status: chavePorValor(StatusOS, ordem.status) as any,
                valorTotal: ordem.valorTotal,
                dataAvaliacao: ordem.dataAvaliacao,
                dataUltimoContato: ordem.dataUltimoContato,
            },
        });
        return ordem;
    }

    async listarTodas(): Promise<OrdemServico[]> {
        const registros = await this.prisma.ordemServico.findMany({ orderBy: { dataEntrada: 'desc' } });
        return registros.map(paraEntidade);
    }

    async buscarPorId(identificador: string): Promise<OrdemServico> {
        const registro = await this.prisma.ordemServico.findUniqueOrThrow({ where: { identificador } });
        return paraEntidade(registro);
    }

    async atualizarStatus(identificador: string, status: StatusOS): Promise<void> {
        await this.prisma.ordemServico.update({
            where: { identificador },
            data: { status: chavePorValor(StatusOS, status) as any },
        });
    }
}
