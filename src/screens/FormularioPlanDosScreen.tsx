import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type FormularioPlanDosScreenRouteProp = RouteProp<RootStackParamList, 'FormularioPlanDosScreen'>;

export default function FormularioPlanDosScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<FormularioPlanDosScreenRouteProp>();
  const { planId, usuarioId } = route.params;

  const [interes, setInteres] = useState('');
  const [personas, setPersonas] = useState('');
  const [presupuesto, setPresupuesto] = useState('');

  const handleBuscarLugares = async () => {
    if (!interes || !personas || !presupuesto) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    const compania =
      parseInt(personas) === 1
        ? 'SOLO'
        : parseInt(personas) === 2
        ? 'PAREJA'
        : 'GRUPO';

    try {
      const response = await fetch('http://10.10.6.113:8080/respuestas-filtros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuarioId,
          fechaRespuesta: new Date().toISOString().split('T')[0],
          compania,
          presupuesto: parseFloat(presupuesto),
          interes
        })
      });

      if (!response.ok) throw new Error('Error al guardar filtros');

      navigation.navigate('FormularioPlanTresScreen', {
        planId,
        interes,
        compania,
        presupuesto,
        usuarioId
      });
    } catch (error) {
      console.error('Error al guardar filtros:', error);
      alert('Error al guardar la información');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Añadamos lugares a tu plan</Text>
      <Text style={styles.subtitulo}>Escojamos algún lugar para tu plan</Text>

      <Text style={styles.label}>¿Qué quieres visitar?</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={interes}
          onValueChange={(itemValue: string) => setInteres(itemValue)}
        >
          <Picker.Item label="Selecciona un lugar" value="" />
          <Picker.Item label="Cultural" value="CULTURAL" />
          <Picker.Item label="Gastronómica" value="GASTRONOMICA" />
          <Picker.Item label="Natural" value="NATURAL" />
          <Picker.Item label="Histórica" value="HISTORICA" />
        </Picker>
      </View>

      <Text style={styles.label}>¿Cuántas personas irán?</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        placeholder="Ingresa un número de personas"
        value={personas}
        onChangeText={setPersonas}
      />

      <Text style={styles.label}>Presupuesto</Text>
      <TextInput
        style={styles.input}
        keyboardType="decimal-pad"
        placeholder="Ingresa el presupuesto"
        value={presupuesto}
        onChangeText={setPresupuesto}
      />

      <TouchableOpacity style={styles.boton} onPress={handleBuscarLugares}>
        <Text style={styles.botonTexto}>Buscar lugares</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 24 },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center'
  },
  subtitulo: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 24,
    textAlign: 'center'
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 8,
    marginTop: 12
  },
  input: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 16,
    fontSize: 16
  },
  pickerContainer: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    overflow: 'hidden'
  },
  boton: {
    backgroundColor: 'black',
    padding: 16,
    borderRadius: 8,
    marginTop: 32
  },
  botonTexto: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
