import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type CrearPlanScreenRouteProp = RouteProp<RootStackParamList, 'CrearPlanScreen'>;

export default function CrearPlanScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<CrearPlanScreenRouteProp>();
  const { usuarioId } = route.params;

  const [nombrePlan, setNombrePlan] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [hora, setHora] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleChangeFecha = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) setFecha(selectedDate);
  };

  const handleChangeHora = (event: any, selectedTime?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) setHora(selectedTime);
  };

  const handleCrearPlan = async () => {
    try {
      const response = await fetch('http://10.10.6.113:8080/planes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuarioId,
          fechaCreacion: fecha.toISOString().split('T')[0],
          compania: 'SOLO',
          presupuesto: 0
        })
      });

      if (!response.ok) throw new Error('Error al crear plan');

      const nuevoPlan = await response.json();
      const planId = nuevoPlan.id;

      alert('Plan creado exitosamente');
      navigation.navigate('FormularioPlanDosScreen', { planId, usuarioId });
    } catch (error) {
      console.error('Error al crear plan:', error);
      alert('Error al crear el plan');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', paddingHorizontal: 24 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 }}>
        Nombre de tu plan
      </Text>

      <TextInput
        style={{
          backgroundColor: '#f3f4f6',
          borderRadius: 8,
          padding: 16,
          textAlign: 'center',
          fontSize: 18
        }}
        placeholder="Ej. Fin de semana Cuencuita"
        value={nombrePlan}
        onChangeText={setNombrePlan}
      />

      {/* Fecha */}
      <View style={{ marginTop: 24 }}>
        <Text style={{ fontSize: 14, fontWeight: '500', color: '#4B5563' }}>Fecha</Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#f3f4f6',
            borderRadius: 8,
            padding: 16,
            marginTop: 8
          }}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>{fecha.toDateString()}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={fecha}
            mode="date"
            display="default"
            onChange={handleChangeFecha}
          />
        )}
      </View>

      {/* Hora */}
      <View style={{ marginTop: 24 }}>
        <Text style={{ fontSize: 14, fontWeight: '500', color: '#4B5563' }}>Hora</Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#f3f4f6',
            borderRadius: 8,
            padding: 16,
            marginTop: 8
          }}
          onPress={() => setShowTimePicker(true)}
        >
          <Text>
            {hora.getHours().toString().padStart(2, '0')}:
            {hora.getMinutes().toString().padStart(2, '0')}
          </Text>
        </TouchableOpacity>

        {showTimePicker && (
          <DateTimePicker
            value={hora}
            mode="time"
            display="default"
            onChange={handleChangeHora}
          />
        )}
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: 'black',
          marginTop: 40,
          padding: 16,
          borderRadius: 8
        }}
        onPress={handleCrearPlan}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
          Crear Plan
        </Text>
      </TouchableOpacity>
    </View>
  );
}
