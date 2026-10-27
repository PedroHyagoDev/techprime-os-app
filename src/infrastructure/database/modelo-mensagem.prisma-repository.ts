import { PrismaService } from './prisma.service';
import { ModeloMensagem } from '../../domain/entities/modelo-mensagem.entity';
import { ModeloMensagemRepository } from '../../application/ports/modelo-mensagem.repository';
import { StatusOS } from '../../domain/enums/status-os.enum';

function chavePorValor<T extends Record<string, string>>(enumObj: T, valor: string): keyof T {
    const chave = Object.keys(enumObj).find((k) => enumObj[k as keyof T] === valor);
    if (!chave) throw new Error(`Valor inválido: ${valor}`);
    return chave as keyof T;
}

function paraEntidade(r: any): ModeloMensagem {
    const modelo = new ModeloMensagem();
    modelo.status = (StatusOS as any)[r.status];
    modelo.mensagem = r.mensagem;
    return modelo;
}

export class ModeloMensagemPrismaRepository implements ModeloMensagemRepository {
    constructor(private readonly prisma: PrismaService) {}

    async buscarPorStatus(status: StatusOS): Promise<ModeloMensagem | null> {
        const registro = await this.prisma.modeloMensagem.findUnique({
            where: { status: chavePorValor(StatusOS, status) as any },
        });
        return registro ? paraEntidade(registro) : null;
    }

    async salvar(modelo: ModeloMensagem): Promise<ModeloMensagem> {
        const chave = chavePorValor(StatusOS, modelo.status) as any;
        await this.prisma.modeloMensagem.upsert({
            where: { status: chave },
            create: { status: chave, mensagem: modelo.mensagem },
            update: { mensagem: modelo.mensagem },
        });
        return modelo;
    }

    async listarTodos(): Promise<ModeloMensagem[]> {
        const registros = await this.prisma.modeloMensagem.findMany();
        return registros.map(paraEntidade);
    }
}