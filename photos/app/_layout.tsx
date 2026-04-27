import { Tabs } from 'expo-router';
import { FavoritosProvider } from './context/FavoritosContext';

export default function TabLayout() {
  return (
    <FavoritosProvider>
      <Tabs screenOptions={{ tabBarActiveTintColor: 'teal' }}>
        <Tabs.Screen name="index" options={{ title: 'Inicio' }} />
        <Tabs.Screen name="FAVORITO" options={{ title: 'Favoritos' }} />
        <Tabs.Screen name="INFORMATIVA" options={{ title: 'Info' }} />
        <Tabs.Screen name="ORIGINAL" options={{ title: 'Extra' }} />
      </Tabs>
    </FavoritosProvider>
  );
}