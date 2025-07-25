import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'HomeScreen'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const route = useRoute<HomeScreenRouteProp>();
  const { usuarioId } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <View style={styles.avatar} />
            <Text style={styles.userName}>Esteban Carpio</Text>
          </View>
          <Ionicons name="notifications-outline" size={24} />
        </View>

        {/* Saludo */}
        <View style={styles.greeting}>
          <Text style={styles.greetingText}>Hola, Esteban.</Text>
          <Text style={styles.greetingSubText}>¿Qué vamos a hacer hoy?</Text>
        </View>

        {/* Categorías */}
        <View style={styles.categoriesHeader}>
          <Text style={styles.categoriesTitle}>Categorías</Text>
          <Text style={styles.categoriesVerTodo}>Ver todo</Text>
        </View>

        <View style={styles.categoriesContainer}>
          {['Cafetería', 'Restaurantes', 'Tours'].map((cat) => (
            <View key={cat} style={styles.categoryCard}>
              <Text style={styles.categoryText}>{cat}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Navegación inferior */}
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
  container: { flex: 1, backgroundColor: 'white' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
    alignItems: 'center'
  },
  profileContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  avatar: {
    width: 36,
    height: 36,
    backgroundColor: '#D1D5DB',
    borderRadius: 18
  },
  userName: { fontWeight: '600' },
  greeting: { paddingHorizontal: 24 },
  greetingText: { fontSize: 20, fontWeight: 'bold' },
  greetingSubText: { fontSize: 18, marginTop: 4 },
  categoriesHeader: {
    marginTop: 24,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  categoriesTitle: { fontWeight: 'bold', fontSize: 16 },
  categoriesVerTodo: { color: '#6B7280' },
  categoriesContainer: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24
  },
  categoryCard: {
    width: 100,
    height: 80,
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151'
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: 'white'
  },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 10 }
});
