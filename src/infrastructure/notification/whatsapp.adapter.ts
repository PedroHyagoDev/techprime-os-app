import { Notifier } from './notifier.port';

export class WhatsappAdapter implements Notifier {
    private readonly token = process.env.WHATSAPP_TOKEN!;
    private readonly phoneNumberId = process.env.WHATSAPP_PHONE_ID!;

    async enviar(destinatario: string, mensagem: string): Promise<void> {
        const url = `https://graph.facebook.com/v20.0/${this.phoneNumberId}/messages`;

        await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messaging_product: 'whatsapp',
                to: destinatario, // formato: 5581999999999 (sem símbolos)
                type: 'text',
                text: { body: mensagem },
            }),
        });
    }
}