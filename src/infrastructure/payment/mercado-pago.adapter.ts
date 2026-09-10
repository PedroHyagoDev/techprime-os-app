import { PaymentGateway } from './payment-gateway.port';

export class MercadoPagoAdapter implements PaymentGateway {
    private readonly token = process.env.MP_ACCESS_TOKEN!;

    async gerarLink(ordemServicoId: string, valor: number, descricao: string): Promise<string> {
        const resposta = await fetch('https://api.mercadopago.com/checkout/preferences', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: [{ title: descricao, quantity: 1, unit_price: valor }],
                external_reference: ordemServicoId,
            }),
        });
        const dados = await resposta.json();
        return dados.init_point;
    }
}