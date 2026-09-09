import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const API_URL = 'http://SEU_IP_LOCAL:3000'; // troque pro IP da sua máquina na rede

export default function ListaOS() {
    const [ordens, setOrdens] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetch(`${API_URL}/ordens-servico`)
            .then((r) => r.json())
            .then(setOrdens);
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.botao} onPress={() => router.push('/nova')}>
                <Text style={styles.botaoTexto}>+ Nova OS</Text>
            </TouchableOpacity>
            <FlatList
                data={ordens}
                keyExtractor={(item) => item.identificador}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.titulo}>OS {item.identificador} — {item.cliente}</Text>
                        <Text>{item.aparelho} · {item.status}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    botao: { backgroundColor: '#2563eb', padding: 16, borderRadius: 8, marginBottom: 16 },
    botaoTexto: { color: '#fff', textAlign: 'center', fontSize: 18, fontWeight: 'bold' },
    card: { padding: 16, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginBottom: 8 },
    titulo: { fontSize: 16, fontWeight: 'bold' },
});