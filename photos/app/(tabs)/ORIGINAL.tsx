import { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function PantallaOriginal() {
  const [contador, setContador] = useState(0);
  return (
    <View style={misEstilos.centro}>
      <Text style={misEstilos.numero}>{contador}</Text>
      <Button title="Incrementar" onPress={() => setContador(contador + 1)} />
    </View>
  );
}
const misEstilos = StyleSheet.create({ centro: { flex: 1, alignItems: 'center', justifyContent: 'center' }, numero: { fontSize: 40 } });