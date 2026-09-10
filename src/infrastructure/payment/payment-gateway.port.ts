export interface PaymentGateway {
    gerarLink(ordemServicoId: string, valor: number, descricao: string): Promise<string>;
}