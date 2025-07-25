import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type HomeNegocioRouteProp = RouteProp<RootStackParamList, 'HomeNegocioScreen'>;
type HomeNegocioNavProp = NativeStackNavigationProp<RootStackParamList, 'HomeNegocioScreen'>;

export default function HomeNegocioScreen() {
  const route = useRoute<HomeNegocioRouteProp>();
  const navigation = useNavigation<HomeNegocioNavProp>();
  const { usuarioId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel del Negocio</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AgregarProductoScreen', { usuarioId })}
      >
        <Text style={styles.buttonText}>Agregar Producto</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // Aún no implementado pero se debe mantener el parámetro
          navigation.navigate('EditarNegocioScreen' as any, { usuarioId });
        }}
      >
        <Text style={styles.buttonText}>Editar Información del Negocio</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // Aún no implementado pero se debe mantener el parámetro
          navigation.navigate('NoticiasNegocioScreen' as any, { usuarioId });
        }}
      >
        <Text style={styles.buttonText}>Publicar Noticias</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
