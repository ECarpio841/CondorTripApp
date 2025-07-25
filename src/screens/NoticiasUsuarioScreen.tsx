// NoticiasUsuarioScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Alerta = {
  id: number;
  titulo: string;
  contenido: string;
  fechaPublicacion: string;
  restaurante: {
    nombre: string;
  };
};

type NoticiasRouteProp = RouteProp<RootStackParamList, 'NoticiasUsuarioScreen'>;

export default function NoticiasUsuarioScreen() {
  const route = useRoute<NoticiasRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { usuarioId } = route.params;

  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://10.10.6.113:8080/alertas')
      .then(res => res.json())
      .then(data => setAlertas(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const renderAlerta = ({ item }: { item: Alerta }) => (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.titulo}</Text>
          <Text style={styles.desc} numberOfLines={2}>{item.contenido}</Text>
          <Text style={styles.meta}>{item.restaurante?.nombre} • {new Date(item.fechaPublicacion).toLocaleDateString()}</Text>
        </View>
        <Image
          source={{ uri: 'https://via.placeholder.com/80x80.png?text=Promo' }}
          style={styles.image}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Noticias</Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={alertas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderAlerta}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      {/* Barra de navegación */}
      <View style={styles.navbar}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ListadoPlanesScreen', { usuarioId })}
          style={styles.navItem}
        >
          <MaterialCommunityIcons name="calendar-check-outline" size={20} />
          <Text style={styles.navText}>Planes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="calendar" size={20} />
          <Text style={styles.navText}>Eventos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('HomeScreen', { usuarioId })}
          style={styles.navItem}
        >
          <Ionicons name="home-outline" size={20} />
          <Text style={styles.navText}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('NoticiasUsuarioScreen', { usuarioId })}
          style={styles.navItem}
        >
          <MaterialCommunityIcons name="newspaper-variant-outline" size={20} />
          <Text style={styles.navText}>Noticias</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('PuntosScreen', { usuarioId })}
          style={styles.navItem}
        >
          <Ionicons name="star-outline" size={20} />
          <Text style={styles.navText}>Tus puntos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', paddingHorizontal: 16, paddingTop: 50 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: {
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
    paddingVertical: 16
  },
  content: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  title: { fontSize: 16, fontWeight: 'bold' },
  desc: { color: '#6b7280', marginTop: 4 },
  meta: { marginTop: 8, color: '#9ca3af', fontSize: 12 },
  image: { width: 80, height: 80, backgroundColor: '#ccc', borderRadius: 4 },
  navbar: {
    position: 'absolute', bottom: 0, width: '100%', flexDirection: 'row',
    justifyContent: 'space-around', paddingVertical: 12,
    borderTopWidth: 1, borderColor: '#D1D5DB', backgroundColor: 'white'
  },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 10 }
});
