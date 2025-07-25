import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'LoginScreen'>;

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.get('http://10.10.6.113:8080/usuarios');
      const usuarios = response.data;
      const usuario = usuarios.find((u: any) => u.email === email && u.contraseña === contraseña);

      if (usuario) {
        const usuarioId = usuario.usuariosId;

        if (usuario.rol === 'NEGOCIO') {
          const actividades = await axios.get('http://10.10.6.113:8080/actividades');
          const yaTieneNegocio = actividades.data.some((a: any) => a.usuarioId === usuarioId);

          navigation.reset({
            index: 0,
            routes: [
              {
                name: yaTieneNegocio ? 'HomeNegocioScreen' : 'CrearNegocioScreen',
                params: { usuarioId }
              }
            ]
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'HomeScreen', params: { usuarioId } }]
          });
        }
      } else {
        Alert.alert('Error', 'Credenciales incorrectas');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo conectar al servidor');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hola. Bienvenido!</Text>
      <Text style={styles.subtitle}>Inicia sesión para poder explorar tus planes!</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('RegistroScreen')}>
        <Text style={styles.link}>¿No tienes cuenta? Regístrate aquí</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: 'white' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#6b7280', marginBottom: 24 },
  input: { backgroundColor: '#f3f4f6', borderRadius: 8, padding: 16, marginBottom: 16 },
  button: { backgroundColor: '#2563eb', padding: 16, borderRadius: 8, marginTop: 8 },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
  link: {
    color: '#2563eb', textAlign: 'center', marginTop: 16, textDecorationLine: 'underline'
  }
});
