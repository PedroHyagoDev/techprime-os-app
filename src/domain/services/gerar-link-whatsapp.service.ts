export function gerarLinkWhatsapp(telefone: string, mensagem: string): string | null {
    let numero = telefone.replace(/\D/g, '');
    if (numero.length === 10 || numero.length === 11) numero = '55' + numero;
    if (numero.length < 12) return null;
    return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}