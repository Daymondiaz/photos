import { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';

export default function PantallaFavoritos() {
  // Aquí usamos <any[]> para evitar el error de TypeScript
  const [misFavs, setMisFavs] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      async function cargarFavoritos() {
        try {
          const datos = await AsyncStorage.getItem('listaFavoritos');
          if (datos) {
            setMisFavs(JSON.parse(datos));
          }
        } catch (e) {
          console.log('Error al leer favoritos');
        }
      }
      cargarFavoritos();
    }, [])
  );

  return (
    <View style={misEstilos.contenedor}>
      <FlatList 
        data={misFavs}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => (
          <View style={misEstilos.tarjeta}>
            <Image source={{ uri: item.download_url }} style={misEstilos.foto} />
            <Text style={misEstilos.texto}>{item.author}</Text>
          </View>
        )}
      />
    </View>
  );
}

const misEstilos = StyleSheet.create({
  contenedor: { flex: 1, padding: 20 },
  tarjeta: { marginBottom: 20, alignItems: 'center' },
  foto: { width: 300, height: 200, borderRadius: 10 },
  texto: { marginTop: 10, fontSize: 16 }
});