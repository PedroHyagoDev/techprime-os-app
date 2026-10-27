import { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';

const API_URL = 'http://10.50.54.134:3000';

export default function ListaOS() {
    const [ordens, setOrdens] = useState<any[]>([]);
    const [carregando, setCarregando] = useState(false);
    const router = useRouter();

    const carregar = useCallback(() => {
        setCarregando(true);
        fetch(`${API_URL}/ordens-servico`)
            .then((r) => r.json())
            .then(setOrdens)
            .catch(() => {})
            .finally(() => setCarregando(false));
    }, []);

    useFocusEffect(
        useCallback(() => {
            carregar();
        }, [carregar]),
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.botao} onPress={() => router.push('/nova')}>
                <Text style={styles.botaoTexto}>+ Nova OS</Text>
            </TouchableOpacity>
            <FlatList
                data={ordens}
                keyExtractor={(item) => item.identificador}
                refreshControl={<RefreshControl refreshing={carregando} onRefresh={carregar} />}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.titulo}>OS {item.identificador} — {item.cliente}</Text>
                        <Text>{item.aparelho} · {item.status}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.vazio}>Nenhuma OS cadastrada ainda</Text>}
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
    vazio: { textAlign: 'center', marginTop: 32, color: '#888' },
});
