import React from "react";

import { View, Text, Image, StyleSheet } from "react-native";

import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

//Export permite que otros archivos importen este componente
//default indica que es un componente principal
export default function Header() {

  //useSafeAreaInsets (junto a SafeAreaView) devuelve los insets (márgenes seguros) del dispositivo actual
  //evita que el contenido se solape con elementos del sistema como la Dynamic Island, barra de estado, etc.
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        //permite que se readapte la imagen al contenedor
        resizeMode="contain"
      ></Image>
      <Text style={styles.title}>Task Manager</Text>
      <Text style={styles.subtitle}>A simple task list app</Text>
    </View>
  );
}

//Estilos para el componente Header, usando StyleSheet de React Native
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        //Las unidades están en pixeles
        paddingVertical: 24,
        gap: 4,
    }, 
    logo: {
        width: 40,
        height: 40,
        marginBottom: 8
    },
    title: {
        fontSize: 20,
        fontWeight: '700'
    },
    subtitle: {
        fontSize: 14,
        color: '#0f4bc2'
    }
});
