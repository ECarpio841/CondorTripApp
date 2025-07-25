// FormularioPlanTresScreen.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  FlatList,
  Dimensions
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type FormularioPlanTresScreenRouteProp = RouteProp<RootStackParamList, 'FormularioPlanTresScreen'>;

export default function FormularioPlanTresScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<FormularioPlanTresScreenRouteProp>();
  const { planId, interes, compania, presupuesto, usuarioId } = route.params;

  const [actividades, setActividades] = useState<any[]>([]);
  const [productos, setProductos] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchActividades();
  }, []);

  const fetchActividades = async () => {
    try {
      const response = await axios.get('http://10.10.6.113:8080/actividades');
      const filtradas = response.data.filter((a: any) => a.categoria === interes);
      setActividades(filtradas);
      if (filtradas.length > 0) {
        fetchProductos(filtradas[0].id);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudieron cargar las actividades.');
    }
  };

  const fetchProductos = async (actividadId: number) => {
    try {
      const response = await axios.get('http://10.10.6.113:8080/productos');
      const filtrados = response.data.filter((producto: any) => producto.actividad.id === actividadId);
      setProductos(filtrados);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudieron cargar los productos.');
    }
  };

  const handleAgregarAlPlan = async (actividadId: number) => {
    try {
      const data = {
        planId,
        actividadId
      };

      await axios.post('http://10.10.6.113:8080/plan-items', data);
      Alert.alert('Éxito', 'Actividad añadida a tu plan.');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo añadir al plan.');
    }
  };

  const handleVerProductos = (actividadId: number) => {
    fetchProductos(actividadId);
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lugares sugeridos</Text>
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={actividades}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.card, { width: screenWidth - 48 }]}>
            <Image source={{ uri: item.imagenUrl }} style={styles.image} />
            <Text style={styles.descripcion}>{item.descripcion}</Text>

            <MapView
              style={styles.map}
              region={{
                latitude: item.latitud,
                longitude: item.longitud,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
              }}
            >
              <Marker
                coordinate={{ latitude: item.latitud, longitude: item.longitud }}
                title={item.descripcion}
              />
            </MapView>

            <Text style={styles.subTitle}>🕐 Horarios</Text>
            <Text style={styles.text}>{item.horario}</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleAgregarAlPlan(item.id)}
            >
              <Text style={styles.buttonText}>Añadir a tu plan</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#6b7280' }]}
              onPress={() => handleVerProductos(item.id)}
            >
              <Text style={styles.buttonText}>Ver productos</Text>
            </TouchableOpacity>

            {productos.length > 0 && (
              <>
                <Text style={styles.subTitle}>📋 Menú</Text>
                {productos.map((producto) => (
                  <View key={producto.id} style={styles.productoItem}>
                    <Text>{producto.descripcion}</Text>
                    <Text>${producto.precio}</Text>
                  </View>
                ))}
              </>
            )}
          </View>
        )}
      />

      <TouchableOpacity
        style={[styles.button, { marginTop: 24, backgroundColor: '#10b981' }]}
        onPress={() => navigation.navigate('ListadoPlanesScreen', { usuarioId })}
      >
        <Text style={styles.buttonText}>Finalizar selección</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 48, paddingHorizontal: 24, backgroundColor: 'white' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  card: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 16,
    marginRight: 16
  },
  image: {
    width: '100%', height: 200, borderRadius: 12, marginBottom: 12
  },
  descripcion: {
    fontSize: 18, fontWeight: 'bold', marginBottom: 8
  },
  map: {
    width: '100%', height: 200, borderRadius: 12, marginBottom: 12
  },
  subTitle: {
    fontWeight: 'bold', marginTop: 12
  },
  text: {
    marginBottom: 8
  },
  button: {
    backgroundColor: '#2563eb', padding: 12,
    borderRadius: 8, marginTop: 8
  },
  buttonText: {
    color: 'white', textAlign: 'center', fontWeight: 'bold'
  },
  productoItem: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 4
  }
});
