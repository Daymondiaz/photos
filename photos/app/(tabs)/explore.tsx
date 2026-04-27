import { View, Text, StyleSheet } from 'react-native';

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explora</Text>
      <Text style={styles.description}>
        Aquí puedes encontrar más cosas sobre fotos y consejos para mejorar tus tomas.
      </Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Consejos para fotos</Text>
        <Text style={styles.cardText}>
          Recuerda que la luz es clave. Intenta tomar fotos en horas doradas, al amanecer o atardecer.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f7fb',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1f2937',
  },
  description: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 15,
    color: '#334155',
    lineHeight: 22,
  },
});
