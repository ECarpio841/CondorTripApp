import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type PuntosScreenRouteProp = RouteProp<RootStackParamList, 'PuntosScreen'>;

export default function PuntosScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<PuntosScreenRouteProp>();
  const { usuarioId } = route.params;

  const handleRecompensaPress = () => {
    navigation.navigate('DetalleRecompensaScreen', { usuarioId });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Text style={styles.title}>Tus puntos</Text>

        <View style={styles.pointsCard}>
          <Text style={styles.pointsText}>130 Puntos</Text>
        </View>

        <Text style={styles.subtitle}>Recompensas</Text>

        <TouchableOpacity style={styles.rewardCard} onPress={handleRecompensaPress}>
          <View style={styles.rewardImage} />
          <View style={styles.rewardTextContainer}>
            <Text style={styles.rewardTitle}>Fin de semana Cuenca</Text>
            <Text style={styles.rewardDesc}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  pointsCard: {
    backgroundColor: '#f3f4f6',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
    elevation: 3
  },
  pointsText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12
  },
  rewardCard: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center'
  },
  rewardImage: {
    width: 40,
    height: 40,
    backgroundColor: '#000',
    borderRadius: 8,
    marginRight: 12
  },
  rewardTextContainer: {
    flex: 1
  },
  rewardTitle: {
    fontWeight: 'bold',
    fontSize: 14
  },
  rewardDesc: {
    color: '#6b7280',
    fontSize: 12
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
