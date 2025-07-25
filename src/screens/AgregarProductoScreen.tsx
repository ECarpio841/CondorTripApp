import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type AgregarProductoScreenRouteProp = RouteProp<RootStackParamList, 'AgregarProductoScreen'>;
type AgregarProductoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AgregarProductoScreen'>;

export default function AgregarProductoScreen() {
  const route = useRoute<AgregarProductoScreenRouteProp>();
  const navigation = useNavigation<AgregarProductoScreenNavigationProp>();
  const { usuarioId } = route.params;

  const [actividadId, setActividadId] = useState<number | null>(null);
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');

  useEffect(() => {
    const obtenerActividad = async () => {
      try {
        const res = await axios.get('http://10.10.6.113:8080/actividades');
        const actividad = res.data.find((a: any) => a.usuario?.usuariosId === usuarioId);
        if (actividad?.id) {
          setActividadId(actividad.id);
        } else {
          Alert.alert('Error', 'No se encontró una actividad para este usuario.');
        }
      } catch (error) {
        console.error('Error al obtener actividad:', error);
        Alert.alert('Error', 'Error al obtener la actividad del negocio.');
      }
    };

    obtenerActividad();
  }, [usuarioId]);

  const handleAgregarProducto = async () => {
    if (!descripcion.trim() || !precio.trim() || actividadId === null) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    const precioNumerico = parseFloat(precio);
    if (isNaN(precioNumerico) || precioNumerico <= 0) {
      Alert.alert('Error', 'El precio debe ser un número válido mayor que 0.');
      return;
    }

    try {
      const producto = {
        descripcion,
        precio: precioNumerico,
        actividad: { id: actividadId }
      };

      await axios.post('http://10.10.6.113:8080/productos', producto);
      Alert.alert('Éxito', 'Producto agregado correctamente');
      navigation.goBack();
    } catch (error) {
      console.error('Error al agregar producto:', error);
      Alert.alert('Error', 'Error al agregar producto');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar nuevo producto</Text>

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Almuerzo típico"
        value={descripcion}
        onChangeText={setDescripcion}
      />

      <Text style={styles.label}>Precio</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. 3.50"
        keyboardType="decimal-pad"
        value={precio}
        onChangeText={setPrecio}
      />

      <TouchableOpacity style={styles.button} onPress={handleAgregarProducto}>
        <Text style={styles.buttonText}>Guardar Producto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 24 },
  title: {
    fontSize: 20, fontWeight: 'bold', marginBottom: 24, textAlign: 'center'
  },
  label: {
    fontWeight: 'bold', fontSize: 14, marginBottom: 8, marginTop: 12
  },
  input: {
    backgroundColor: '#f3f4f6', borderRadius: 8, padding: 16, fontSize: 16
  },
  button: {
    backgroundColor: '#2563eb', padding: 16, borderRadius: 8, marginTop: 32
  },
  buttonText: {
    color: 'white', textAlign: 'center', fontWeight: 'bold'
  }
});
