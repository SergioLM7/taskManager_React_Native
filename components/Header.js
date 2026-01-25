import React from "react";

import { View, Text, Image, StyleSheet } from "react-native";

//Export permite que otros archivos importen este componente
//default indica que es un componente principal
export default function Header() {
  return (
    <View style={styles.container}>
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
        gap: 4
    }, 
    logo: {
        width: 80,
        height: 80,
        marginBottom: 8
    },
    title: {
        fontSize: 20,
        fontWeight: '700'
    },
    subtitle: {
        fontSize: 14,
        color: '#d11919'
    }
});
