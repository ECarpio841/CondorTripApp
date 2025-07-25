import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

export default function RegistroScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [rol, setRol] = useState('USUARIO');

  const handleRegistro = async () => {
    if (!nombre || !email || !contraseña) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    try {
      await axios.post('http://10.10.6.113:8080/usuarios', {
        nombre,
        email,
        contraseña,
        puntos: 0,
        rol
      });

      Alert.alert('Registro exitoso', 'Ahora puedes iniciar sesión');
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo registrar el usuario.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={contraseña}
        onChangeText={setContraseña}
        secureTextEntry
      />

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Selecciona tu rol:</Text>
        <Picker selectedValue={rol} onValueChange={(value) => setRol(value)}>
          <Picker.Item label="Usuario normal" value="USUARIO" />
          <Picker.Item label="Negocio / Administrador" value="NEGOCIO" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegistro}>
        <Text style={styles.buttonText}>Registrarme</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: 'white' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 },
  input: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16
  },
  pickerContainer: { marginVertical: 12 },
  label: { fontWeight: 'bold', marginBottom: 4 },
  button: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    marginTop: 16
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
