import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';

const preguntas = [
  {
    key: 'nivel',
    texto: '¿Cómo te ves a ti mismo?',
    opciones: ['Profesional', 'Aficionado', 'Estudiante', 'Ocasional'],
  },
  {
    key: 'especialidad',
    texto: '¿Qué tipo de fotos te gusta hacer?',
    opciones: ['Retrato', 'Paisaje', 'Producto', 'Eventos', 'Otra'],
  },
  {
    key: 'equipo',
    texto: '¿Qué usas para tomar fotos?',
    opciones: ['Cámara profesional', 'Cámara mirrorless', 'Móvil', 'Mixto'],
  },
];

export default function PantallaOriginal() {
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});

  const preguntaActual = preguntas[paso];

  const seleccionarOpcion = (opcion: string) => {
    setRespuestas((prev) => ({ ...prev, [preguntaActual.key]: opcion }));
    setPaso((prev) => Math.min(prev + 1, preguntas.length));
  };

  const reiniciarEncuesta = () => {
    setRespuestas({});
    setPaso(0);
  };

  return (
    <ScrollView contentContainerStyle={estilos.contenedor}>
      <Text style={estilos.titulo}>Conoce tu perfil fotográfico</Text>

      {paso < preguntas.length ? (
        <View style={estilos.bloquePregunta}>
          <Text style={estilos.pregunta}>{preguntaActual.texto}</Text>
          {preguntaActual.opciones.map((opcion) => (
            <Pressable
              key={opcion}
              style={estilos.opcion}
              onPress={() => seleccionarOpcion(opcion)}>
              <Text style={estilos.textoOpcion}>{opcion}</Text>
            </Pressable>
          ))}
          <Text style={estilos.pasoTexto}>Pregunta {paso + 1} de {preguntas.length}</Text>
        </View>
      ) : (
        <View style={estilos.resultado}>
          <Text style={estilos.subtitulo}>¡Listo!</Text>
          <Text style={estilos.textoResumen}>Tu perfil:</Text>
          <View style={estilos.resumenCaja}>
            {preguntas.map((pregunta) => (
              <View key={pregunta.key} style={estilos.resumenLinea}>
                <Text style={estilos.resumenTitulo}>{pregunta.texto}</Text>
                <Text style={estilos.resumenValor}>{respuestas[pregunta.key] || 'No seleccionado'}</Text>
              </View>
            ))}
          </View>
          <Pressable style={estilos.botonReiniciar} onPress={reiniciarEncuesta}>
            <Text style={estilos.botonTexto}>Responder de nuevo</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flexGrow: 1, padding: 20, backgroundColor: '#f7f7f7' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#111' },
  bloquePregunta: { backgroundColor: '#fff', borderRadius: 16, padding: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  pregunta: { fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#222' },
  opcion: { backgroundColor: '#e5e7eb', paddingVertical: 14, paddingHorizontal: 16, borderRadius: 12, marginBottom: 12 },
  textoOpcion: { fontSize: 16, color: '#111' },
  pasoTexto: { marginTop: 10, color: '#6b7280', fontSize: 14 },
  resultado: { backgroundColor: '#fff', borderRadius: 16, padding: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  subtitulo: { fontSize: 18, fontWeight: '600', marginBottom: 12, color: '#111' },
  textoResumen: { fontSize: 16, marginBottom: 12, color: '#374151' },
  resumenCaja: { backgroundColor: '#f3f4f6', borderRadius: 14, padding: 16 },
  resumenLinea: { marginBottom: 12 },
  resumenTitulo: { fontSize: 14, color: '#6b7280' },
  resumenValor: { fontSize: 16, fontWeight: '600', color: '#111' },
  botonReiniciar: { marginTop: 16, backgroundColor: '#2563eb', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: '600' },
});