export interface Notifier {
    enviar(destinatario: string, mensagem: string): Promise<void>;
}