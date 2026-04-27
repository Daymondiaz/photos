import { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Image } from 'react-native';

export default function PantallaInicio() {
  // 1. Aquí está el cambio clave <any[]>
  const [listaCompleta, setListaCompleta] = useState<any[]>([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    fetch('https://picsum.photos/v2/list?limit=20')
      .then(r => r.json())
      .then(datos => setListaCompleta(datos));
  }, []);

  const listaFiltrada = listaCompleta.filter(item => 
    item.author.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <View style={misEstilos.cajaBase}>
      <TextInput 
        style={misEstilos.input}
        placeholder="Buscar por autor..."
        onChangeText={setBusqueda}
        value={busqueda}
      />
      <FlatList 
        data={listaFiltrada}
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

// Asegúrate de tener esto al final del archivo
const misEstilos = StyleSheet.create({
  cajaBase: { flex: 1, padding: 15 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 8, borderColor: '#ccc' },
  tarjeta: { marginBottom: 20, alignItems: 'center' },
  foto: { width: 300, height: 200, borderRadius: 10 },
  texto: { marginTop: 5, fontSize: 16 }
});