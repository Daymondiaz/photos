import { Tabs } from 'expo-router';

import React from 'react';



export default function TabLayout() {

  return (

    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>

      <Tabs.Screen name="index" options={{ title: 'Inicio' }} />

      <Tabs.Screen name="FAVORITO" options={{ title: 'Favoritos' }} />

      <Tabs.Screen name="ORIGINAL" options={{ title: 'Original' }} />

      <Tabs.Screen name="INFORMATIVA" options={{ title: 'Info' }} />

    </Tabs>

  );

}