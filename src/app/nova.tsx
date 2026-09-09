import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const API_URL = 'http://SEU_IP_LOCAL:3000';

export default function NovaOS() {
    const [cliente, setCliente] = useState('');
    const [aparelho, setAparelho] = useState('');
    const [defeito, setDefeito] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const router = useRouter();

    async function salvar() {
        await fetch(`${API_URL}/ordens-servico`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                cliente, aparelho, defeito, whatsapp,
                urgencia: 'Media',
                formaContato: whatsapp ? 'WhatsApp' : undefined,
            }),
        });
        router.back();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Cliente</Text>
            <TextInput style={styles.input} value={cliente} onChangeText={setCliente} />
            <Text style={styles.label}>Aparelho</Text>
            <TextInput style={styles.input} value={aparelho} onChangeText={setAparelho} />
            <Text style={styles.label}>Defeito</Text>
            <TextInput style={styles.input} value={defeito} onChangeText={setDefeito} />
            <Text style={styles.label}>WhatsApp</Text>
            <TextInput style={styles.input} value={whatsapp} onChangeText={setWhatsapp} keyboardType="numeric" />
            <TouchableOpacity style={styles.botao} onPress={salvar}>
                <Text style={styles.botaoTexto}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    label: { fontSize: 16, marginTop: 12, marginBottom: 4 },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16 },
    botao: { backgroundColor: '#16a34a', padding: 16, borderRadius: 8, marginTop: 24 },
    botaoTexto: { color: '#fff', textAlign: 'center', fontSize: 18, fontWeight: 'bold' },
});