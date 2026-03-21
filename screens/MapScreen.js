import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, StyleSheet, Button} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapScreen() {

    const [loading, setLoading] = useState(true);
    const [coordinates, setCoordinates] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");


    async function fetchLocation() {
        setLoading(true);
        setErrorMsg("");
        
        //Pedir permisos de localización para la aplicación
        //Va a mostrar el pop-up de petición de permisos de ubicación 
        // (al llamar a Foreground en lugar de a Background que gestionaría los permisos de ubicación en segundo plano)
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if(status !== 'granted') {
                setErrorMsg('Permiso de ubicación denegado');
                setCoordinates(null);
                return;
            }

            //Miramos si los servicios están activados
            const servicesEnabled = await Location.hasServicesEnabledAsync();
            if(!servicesEnabled) {
                setErrorMsg('No está activo el GPS. Actívalo y prueba de nuevo');
                setCoordinates(null);
                return;
            }

            //Obtenemos la última ubicación conocida (será undefined si no existen coordenadas previas)
            const lastKnownLocation = await Location.getLastKnownPositionAsync();
            if(lastKnownLocation) {
                setCoordinates({
                    latitude: lastKnownLocation.coords.latitude,
                    longitude: lastKnownLocation.coords.longitude
                });
                return;
            }
            
            //Obtener la ubicación actual
            const currentLocation = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced
            });
            setCoordinates({
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
            });        
        } catch (error) {
            console.log(error);
            setErrorMsg("No se pudo obtener ubicación");
            setCoordinates(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchLocation();
    }, []);

    if(loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text >Obteniendo ubicación...</Text>
            </View>
        );
    }

    if(errorMsg) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>No se pudo mostrar el mapa: {errorMsg}</Text>
                <Button title="Reintentar" onPress={fetchLocation} />
            </View>
        );
    }

    //Configuramos la región del mapa que se va a ver
    const region = {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        //El máximo de estos parámetros es 1 (menos zoom)
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={region}
                //Permitir que se vea la ubicación del usuario (punto azul clásico)
                showsUserLocation
            >
                <Marker
                    //Ponemos un marcador
                    coordinate={coordinates}
                />
            </MapView>
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Lat: {coordinates.latitude.toFixed(6)} · Lon: {coordinates.longitude.toFixed(6)}
                </Text>
                <View style={{ marginTop: 8,paddingBottom: 32 }}>
                <Button title="Reiniciar seguimiento" onPress={fetchLocation} />
                </View>
            </View>
        </View> 
    )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  footer: {
    padding: 12,
    paddingBottom: 32, 
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  footerText: { fontSize: 14, color: '#333' },
});