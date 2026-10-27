import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const API_URL = 'http://10.50.54.134:3000';

export default function NovaOS() {
    const [cliente, setCliente] = useState('');
    const [aparelho, setAparelho] = useState('');
    const [defeito, setDefeito] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [salvando, setSalvando] = useState(false);
    const router = useRouter();

    async function salvar() {
        if (!cliente || !aparelho || !defeito) return;
        setSalvando(true);
        try {
            await fetch(`${API_URL}/ordens-servico`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cliente,
                    aparelho,
                    defeito,
                    whatsapp,
                    urgencia: 'Media',
                    formaContato: whatsapp ? 'WhatsApp' : undefined,
                }),
            });
            router.back();
        } finally {
            setSalvando(false);
        }
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Cliente</Text>
            <TextInput style={styles.input} value={cliente} onChangeText={setCliente} />
            <Text style={styles.label}>Aparelho</Text>
            <TextInput style={styles.input} value={aparelho} onChangeText={setAparelho} />
            <Text style={styles.label}>Defeito</Text>
            <TextInput style={styles.input} value={defeito} onChangeText={setDefeito} />
            <Text style={styles.label}>WhatsApp</Text>
            <TextInput style={styles.input} value={whatsapp} onChangeText={setWhatsapp} keyboardType="numeric" />
            <TouchableOpacity style={styles.botao} onPress={salvar} disabled={salvando}>
                <Text style={styles.botaoTexto}>{salvando ? 'Salvando...' : 'Salvar'}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    label: { fontSize: 16, marginTop: 12, marginBottom: 4 },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16 },
    botao: { backgroundColor: '#16a34a', padding: 16, borderRadius: 8, marginTop: 24, marginBottom: 32 },
    botaoTexto: { color: '#fff', textAlign: 'center', fontSize: 18, fontWeight: 'bold' },
});
