import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';

type RouteProps = RouteProp<RootStackParamList, 'HomeNegocioScreen'>;

export default function NoticiasNegocioScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProps>();
  const { usuarioId } = route.params;

  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [actividadId, setActividadId] = useState<number | null>(null);

  useEffect(() => {
    const obtenerActividad = async () => {
      try {
        const res = await axios.get('http://10.10.6.113:8080/actividades');
        console.log('Actividades:', res.data);

        // Compara con usuario.usuariosId
        const actividad = res.data.find((a: any) =>
          a.usuario?.usuariosId === usuarioId
        );

        if (actividad?.id) {
          setActividadId(actividad.id);
          console.log('Actividad encontrada:', actividad);
        } else {
          Alert.alert('Error', 'No se encontró la actividad del negocio para este usuario.');
        }
      } catch (error) {
        console.error('Error al obtener la actividad:', error);
        Alert.alert('Error', 'No se pudo obtener la información del negocio');
      }
    };

    obtenerActividad();
  }, [usuarioId]);

  const handlePublicar = async () => {
    if (!titulo.trim() || !contenido.trim() || !actividadId) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    try {
      const alerta = {
        titulo,
        contenido,
        fechaPublicacion: new Date().toISOString(),
        restaurante: { id: actividadId }
      };

      await axios.post('http://10.10.6.113:8080/alertas', alerta);
      Alert.alert('Éxito', 'Noticia publicada');
      navigation.goBack();
    } catch (error: any) {
      console.error('Error al publicar noticia:', error.response?.data || error.message);
      Alert.alert('Error', 'No se pudo publicar la noticia');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Publicar Noticia</Text>

      <TextInput
        style={styles.input}
        placeholder="Título de la promoción"
        value={titulo}
        onChangeText={setTitulo}
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Descripción de la promoción"
        value={contenido}
        onChangeText={setContenido}
        multiline
      />

      <TouchableOpacity style={styles.botonPublicar} onPress={handlePublicar}>
        <Text style={styles.botonTexto}>Publicar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: 'white' },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  input: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12
  },
  botonPublicar: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    marginTop: 16
  },
  botonTexto: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
