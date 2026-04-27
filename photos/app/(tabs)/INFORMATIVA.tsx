import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Platform, ActivityIndicator } from 'react-native';

const API_URL = 'https://picsum.photos/v2/list?limit=10';
const PROXY_URL = 'https://api.allorigins.win/raw?url=';

export default function PantallaInformativa() {
  const [datos, setDatos] = useState<any>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const obtenerUrl = () => {
    return Platform.OS === 'web' ? `${PROXY_URL}${encodeURIComponent(API_URL)}` : API_URL;
  };

  const cargarDatos = async () => {
    setCargando(true);
    setError(null);

    try {
      const respuesta = await fetch(obtenerUrl());
      if (!respuesta.ok) {
        throw new Error(`Error de la API: ${respuesta.status}`);
      }
      const json = await respuesta.json();
      setDatos(json);
    } catch (err: any) {
      setError(err.message || 'Error desconocido');
      setDatos(null);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const datosArray = Array.isArray(datos) ? datos : [];

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Datos de fotos</Text>
      <Text style={styles.subtexto}>Conexión usada: {Platform.OS === 'web' ? 'Proxy web' : 'Directo'} ({obtenerUrl()})</Text>

      {cargando ? (
        <View style={styles.estadoCentro}>
          <ActivityIndicator size="large" color="#333" />
          <Text style={styles.subtexto}>Cargando fotos...</Text>
        </View>
      ) : error ? (
        <Text style={styles.error}>Error: {error}</Text>
      ) : datosArray.length > 0 ? (
        <View style={styles.resultado}>
          <Text style={styles.subtexto}>Se encontraron {datosArray.length} fotos.</Text>
          <FlatList
            data={datosArray}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Autor: {item.author}</Text>
                <Text style={styles.cardText}>ID: {item.id}</Text>
                <Text style={styles.cardText}>Tamaño: {item.width} x {item.height}</Text>
                <Text style={styles.cardText}>URL:</Text>
                <Text style={styles.cardUrl}>{item.url}</Text>
              </View>
            )}
          />
          <Pressable style={styles.boton} onPress={cargarDatos}>
            <Text style={styles.botonTexto}>Actualizar</Text>
          </Pressable>
        </View>
      ) : (
        <Text style={styles.subtexto}>No se encontraron datos para mostrar.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, padding: 20, backgroundColor: '#f2f4f7' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 8, color: '#0f172a' },
  subtexto: { fontSize: 16, marginBottom: 14, color: '#475569' },
  estadoCentro: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { fontSize: 16, color: '#b91c1c', marginTop: 20 },
  resultado: { flex: 1 },
  card: { marginBottom: 14, backgroundColor: '#ffffff', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  cardTitle: { fontSize: 18, fontWeight: '700', marginBottom: 6, color: '#0f172a' },
  cardText: { fontSize: 15, color: '#334155', marginBottom: 4 },
  cardUrl: { fontSize: 13, color: '#2563eb', marginBottom: 2 },
  boton: { marginTop: 10, paddingVertical: 12, borderRadius: 12, backgroundColor: '#2563eb', alignItems: 'center' },
  botonTexto: { color: '#ffffff', fontSize: 16, fontWeight: '600' }
});