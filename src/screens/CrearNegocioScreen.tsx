import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MapView, { Marker } from 'react-native-maps';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useRoute, RouteProp } from '@react-navigation/native';
export default function CrearNegocioScreen() {
  const [descripcion, setDescripcion] = useState('');
  const [direccion, setDireccion] = useState('');
  const [horario, setHorario] = useState('');
  const [telefono, setTelefono] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [region, setRegion] = useState({
    latitude: -2.90055,
    longitude: -79.00453,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  });

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
const route = useRoute<RouteProp<RootStackParamList, 'CrearNegocioScreen'>>();
const { usuarioId } = route.params;

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleCrearNegocio = async () => {
    if (!descripcion || !direccion || !horario || !telefono || !categoria || !imageUri) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    try {
      const actividadData = {
        descripcion,
        direccion,
        horario,
        telefono,
        latitud: region.latitude,
        longitud: region.longitude,
        imagenUrl: imageUri, // En producción debería subirse a un servidor
        categoria,
        usuarioId
      };

        console.log('Datos enviados:', actividadData);
      await axios.post('http://10.10.6.113:8080/actividades', actividadData);

      Alert.alert('Negocio creado', 'Tu negocio fue registrado exitosamente.');
navigation.navigate('HomeNegocioScreen', { usuarioId: usuarioId });
// Cambia a la pantalla de inicio del negocio
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo registrar el negocio.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crea tu Negocio</Text>

      <TouchableOpacity onPress={handleImagePick} style={styles.imagePicker}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholder} />
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Nombre o descripción"
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <TextInput
        style={styles.input}
        placeholder="Dirección"
        value={direccion}
        onChangeText={setDireccion}
      />
      <TextInput
        style={styles.input}
        placeholder="Horario"
        value={horario}
        onChangeText={setHorario}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
      />

      <Picker
        selectedValue={categoria}
        onValueChange={(itemValue) => setCategoria(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecciona una categoría" value="" />
        <Picker.Item label="Cultural" value="CULTURAL" />
        <Picker.Item label="Gastronómica" value="GASTRONOMICA" />
        <Picker.Item label="Natural" value="NATURAL" />
        <Picker.Item label="Histórica" value="HISTORICA" />
      </Picker>

      <MapView style={styles.map} region={region} onRegionChangeComplete={setRegion}>
        <Marker coordinate={region} />
      </MapView>

      <TouchableOpacity style={styles.button} onPress={handleCrearNegocio}>
        <Text style={styles.buttonText}>Crear Negocio</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: 'white',
    flexGrow: 1
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },
  input: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12
  },
  picker: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    marginBottom: 12
  },
  map: {
    height: 200,
    borderRadius: 8,
    marginVertical: 16
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  imagePicker: {
    alignSelf: 'center',
    marginBottom: 16
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: 'cover'
  },
  placeholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ccc'
  }
});
