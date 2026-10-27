export function preencherModelo(modelo: string, dados: Record<string, string>): string {
    return modelo.replace(/\{(\w+)\}/g, (original, chave) => dados[chave] ?? original);
}