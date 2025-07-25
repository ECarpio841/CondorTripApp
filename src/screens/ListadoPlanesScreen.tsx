import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Plan = {
  id: number;
  nombre: string;
  descripcion: string;
  imagenUrl: string;
  usuario: { id: number };
};

type Props = RouteProp<RootStackParamList, 'ListadoPlanesScreen'>;

export default function ListadoPlanesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<Props>();
  const { usuarioId } = route.params;

  const [planes, setPlanes] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlanes();
  }, []);

  const fetchPlanes = async () => {
    try {
      const response = await fetch('http://10.10.6.113:8080/planes');
      const data = await response.json();
      const planesFiltrados = data.filter((plan: Plan) => plan.usuario?.id === usuarioId);
      setPlanes(planesFiltrados);
    } catch (error) {
      console.error('Error al obtener planes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCrearPlan = () => {
    navigation.navigate('CrearPlanScreen', { usuarioId });
  };

  const renderPlanItem = ({ item }: { item: Plan }) => (
    <View style={styles.planCard}>
      <Image source={{ uri: item.imagenUrl }} style={styles.planImage} />
      <View style={styles.planText}>
        <Text style={styles.planTitle}>{item.nombre}</Text>
        <Text style={styles.planDescription} numberOfLines={2}>
          {item.descripcion}
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('FormularioPlanDosScreen', {
              planId: item.id,
              usuarioId
            })
          }
        >
          <Text style={styles.editarTexto}>✏️ Editar plan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Planes</Text>
        <TouchableOpacity onPress={handleCrearPlan}>
          <Ionicons name="add-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitulo}>Últimos planes</Text>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 16 }} />
      ) : planes.length === 0 ? (
        <Text style={{ color: '#9ca3af', marginTop: 16 }}>No hay planes disponibles aún.</Text>
      ) : (
        <FlatList
          data={planes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPlanItem}
          contentContainerStyle={{ paddingBottom: 50 }}
          style={{ marginTop: 16 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', paddingHorizontal: 16, paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  subtitulo: { marginTop: 24, fontWeight: 'bold', fontSize: 16, color: '#111827' },
  planCard: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb'
  },
  planImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#ccc'
  },
  planText: {
    flex: 1
  },
  planTitle: { fontWeight: 'bold', fontSize: 16 },
  planDescription: { color: '#4b5563', fontSize: 14, marginTop: 4 },
  editarTexto: { color: '#2563eb', marginTop: 8, fontSize: 13 }
});
