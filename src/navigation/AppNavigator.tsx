import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import HomeScreen from '../screens/HomeScreen';
import ListadoPlanesScreen from '../screens/ListadoPlanesScreen';
import CrearPlanScreen from '../screens/CrearPlanScreen';
import FormularioPlanDosScreen from '../screens/FormularioPlanDosScreen';
import FormularioPlanTresScreen from '../screens/FormularioPlanTres';
import PuntosScreen from '../screens/PuntosScreen';
import DetalleRecompensaScreen from '../screens/DetalleRecompensaScreen';
import RecompensaReclamadaScreen from '../screens/RecompensaReclamadaScreen';
import RegistroScreen from '../screens/RegistroScreen';
import LoginScreen from '../screens/LoginScreen';
import CrearNegocioScreen from '../screens/CrearNegocioScreen';
import HomeNegocioScreen from '../screens/HomeNegocioScreen';
import AgregarProductoScreen from '../screens/AgregarProductoScreen';
import NoticiasUsuarioScreen from '../screens/NoticiasUsuarioScreen';
import NoticiasNegocioScreen from '../screens/NoticiaNegocioScreen';

// Tipado de rutas
export type RootStackParamList = {
  LoginScreen: undefined;
  RegistroScreen: undefined;
  HomeScreen: { usuarioId: number };
  HomeNegocioScreen: { usuarioId: number };
  CrearNegocioScreen: { usuarioId: number };
  ListadoPlanesScreen: { usuarioId: number };
  CrearPlanScreen: { usuarioId: number };
  AgregarProductoScreen: { usuarioId: number };
  FormularioPlanDosScreen: { planId: number; usuarioId: number };
  FormularioPlanTresScreen: {
    planId: number;
    interes: string;
    compania: string;
    presupuesto: string;
    usuarioId: number; // ✅ necesario para que navegue a ListadoPlanesScreen correctamente
  };
  PuntosScreen: { usuarioId: number };
  DetalleRecompensaScreen: { usuarioId: number };
  RecompensaReclamadaScreen: { usuarioId: number };
  NoticiasNegocioScreen: { usuarioId: number };
  NoticiasUsuarioScreen: { usuarioId: number }

};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegistroScreen" component={RegistroScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="HomeNegocioScreen" component={HomeNegocioScreen} />
        <Stack.Screen name="CrearNegocioScreen" component={CrearNegocioScreen} />
        <Stack.Screen name="ListadoPlanesScreen" component={ListadoPlanesScreen} />
        <Stack.Screen name="CrearPlanScreen" component={CrearPlanScreen} />
        <Stack.Screen name="FormularioPlanDosScreen" component={FormularioPlanDosScreen} />
        <Stack.Screen name="FormularioPlanTresScreen" component={FormularioPlanTresScreen} />
        <Stack.Screen name="PuntosScreen" component={PuntosScreen} />
        <Stack.Screen name="DetalleRecompensaScreen" component={DetalleRecompensaScreen} />
        <Stack.Screen name="RecompensaReclamadaScreen" component={RecompensaReclamadaScreen} />
        <Stack.Screen name="AgregarProductoScreen" component={AgregarProductoScreen} />
        <Stack.Screen name="NoticiasNegocioScreen" component={NoticiasNegocioScreen} />
        <Stack.Screen name="NoticiasUsuarioScreen" component={NoticiasUsuarioScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
