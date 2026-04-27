import { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Image, Pressable } from 'react-native';
import { useMisFavoritos } from '../context/FavoritosContext'; 

export default function PantallaInicio() {
  const [listaCompleta, setListaCompleta] = useState<any[]>([]);
  const [busqueda, setBusqueda] = useState('');
  
  const { listaFavoritos, alternarFavorito } = useMisFavoritos();

  useEffect(() => {
    fetch('https://picsum.photos/v2/list?limit=20')
      .then(r => r.json())
      .then(datos => setListaCompleta(datos));
  }, []);

  const listaFiltrada = listaCompleta.filter(item => 
    item.author && item.author.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <View style={misEstilos.cajaBase}>
      <TextInput 
        style={misEstilos.input}
        placeholder="Busca por autor..."
        onChangeText={setBusqueda}
        value={busqueda}
      />
      <FlatList 
        data={listaFiltrada}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => {
          // Comprobamos si este item ya es favorito
          const esFav = listaFavoritos.find(f => f.id === item.id);
          
          return (
            <View style={misEstilos.tarjeta}>
              <Image source={{ uri: item.download_url }} style={misEstilos.foto} />
              
              <View style={misEstilos.filaDetalles}>
                <Text style={misEstilos.autor}>{item.author}</Text>
                
                <Pressable onPress={() => alternarFavorito(item)} style={misEstilos.botonFav}>
                  <Text style={misEstilos.icono}>{esFav ? '❤️' : '🤍'}</Text>
                </Pressable>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const misEstilos = StyleSheet.create({
  cajaBase: { flex: 1, padding: 15 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 8, borderColor: '#ccc' },
  tarjeta: { marginBottom: 20, borderWidth: 1, borderColor: '#eee', borderRadius: 10, padding: 10, backgroundColor: 'white' },
  foto: { width: '100%', height: 200, borderRadius: 10, marginBottom: 10 },
  filaDetalles: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  autor: { fontSize: 16, fontWeight: 'bold' },
  botonFav: { padding: 5 },
  icono: { fontSize: 24 }
});