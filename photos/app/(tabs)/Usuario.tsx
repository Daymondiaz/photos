import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';

export default function PantallaUsuario() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [guardado, setGuardado] = useState(false);

  const guardarPerfil = () => {
    if (nombre && email) {
      setGuardado(true);
    }
  };

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Mi perfil</Text>

      {!guardado ? (
        <View style={estilos.formulario}>
          <TextInput
            style={estilos.input}
            placeholder="Tu nombre"
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            style={estilos.input}
            placeholder="Tu email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Pressable style={estilos.boton} onPress={guardarPerfil}>
            <Text style={estilos.textoBoton}>Guardar</Text>
          </Pressable>
        </View>
      ) : (
        <View style={estilos.perfil}>
          <Text style={estilos.nombre}>{nombre}</Text>
          <Text style={estilos.email}>{email}</Text>
          <Pressable style={estilos.botonEditar} onPress={() => setGuardado(false)}>
            <Text style={estilos.textoEditar}>Editar</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  formulario: { backgroundColor: '#fff', padding: 20, borderRadius: 10 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 15, borderRadius: 5 },
  boton: { backgroundColor: '#007bff', padding: 15, borderRadius: 5, alignItems: 'center' },
  textoBoton: { color: '#fff', fontSize: 16 },
  perfil: { backgroundColor: '#fff', padding: 20, borderRadius: 10, alignItems: 'center' },
  nombre: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  email: { fontSize: 16, color: '#666', marginBottom: 20 },
  botonEditar: { borderWidth: 1, borderColor: '#007bff', padding: 10, borderRadius: 5 },
  textoEditar: { color: '#007bff', fontSize: 16 },
});