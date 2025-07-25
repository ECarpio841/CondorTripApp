import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function DetalleRecompensaScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="chevron-back-outline" size={24} />
        <Text style={styles.headerText}>Recompensa</Text>
      </View>

      <Text style={styles.title}>Cafetería Don Ponky</Text>
      <Text style={styles.subtitle}>Café en descuento por {"\n"} [Puntos Necesarios]</Text>

      <Image
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.info}>
        <Ionicons name="location-outline" size={16} />
        <Text>Ver ubicación</Text>
        <Text>Ver menú</Text>
        <Text>Horarios</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('RecompensaReclamadaScreen')}
      >
        <Text style={styles.buttonText}>Reclamar recompensa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 24 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  headerText: { fontWeight: 'bold', fontSize: 16, marginLeft: 8 },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { fontSize: 14, textAlign: 'center', color: '#6B7280', marginVertical: 12 },
  image: { width: '100%', height: 180, borderRadius: 12, marginBottom: 16 },
  info: { alignItems: 'center', gap: 4 },
  button: {
    backgroundColor: 'black',
    padding: 16,
    borderRadius: 8,
    marginTop: 24
  },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' }
});




