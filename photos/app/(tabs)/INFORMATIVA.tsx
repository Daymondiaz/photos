import { View, Text, StyleSheet } from 'react-native';

export default function PantallaInfo() {
  return (
    <View style={misEstilos.caja}>
      <Text style={misEstilos.titulo}>Proyecto de React</Text>
      <Text style={misEstilos.info}>Este es un taller académico sobre el consumo de APIs externas.</Text>
    </View>
  );
}

const misEstilos = StyleSheet.create({ 
  caja: { padding: 40, backgroundColor: '#f9f9f9', margin: 20, borderRadius: 15 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  info: { fontSize: 16, color: '#555' }
});