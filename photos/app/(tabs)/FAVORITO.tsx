import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { useMisFavoritos } from '../context/FavoritosContext'; 

export default function PantallaFavoritos() {
  const { listaFavoritos } = useMisFavoritos();

  return (
    <View style={misEstilos.contenedor}>
      <FlatList 
        data={listaFavoritos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={misEstilos.tarjeta}>
             <Image source={{ uri: item.download_url }} style={misEstilos.fotoMini} />
             <Text style={misEstilos.autor}>{item.author}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={misEstilos.textoVacio}>Aún no tienes fotos favoritas.</Text>}
      />
    </View>
  );
}

const misEstilos = StyleSheet.create({
  contenedor: { flex: 1, padding: 20 },
  tarjeta: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 10 },
  fotoMini: { width: 60, height: 60, borderRadius: 10, marginRight: 15 },
  autor: { fontSize: 16, fontWeight: 'bold' },
  textoVacio: { fontSize: 18, textAlign: 'center', marginTop: 50, color: '#666' }
});