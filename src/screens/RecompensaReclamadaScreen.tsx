import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

export default function RecompensaReclamadaScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleVolverInicio = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recompensa Reclamada</Text>
        <View style={{ width: 24 }} /> {/* Espaciador para centrar título */}
      </View>

      {/* Ícono */}
      <View style={styles.content}>
        <Ionicons
          name="checkmark-circle-outline"
          size={150}
          color="#9ca3af" // gris claro como en la maqueta
          style={styles.icon}
        />
        <Text style={styles.message}>Has reclamado tu recompensa con éxito.</Text>
      </View>

      {/* Botón */}
      <TouchableOpacity style={styles.button} onPress={handleVolverInicio}>
        <Text style={styles.buttonText}>Volver al inicio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 24 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    marginBottom: 24
  },
  message: {
    textAlign: 'center',
    fontSize: 14,
    color: '#374151'
  },
  button: {
    backgroundColor: 'black',
    padding: 16,
    borderRadius: 8
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
