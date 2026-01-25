import React from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

//A cada TaskItem se le asignará una tarea específica, un objeto con (id, texto, boolean) y una función onToggle para cambiar su estado
export default function TaskItem({ item, onToggle }) {
  return (
    //Recogemos el id de la tarjeta pulsada
    <TouchableOpacity onPress={() => onToggle(item.id)}>
      //Si el item está marcado como hecho, aplicamos estilos diferentes, sino,
      solo los estilos base
      <View style={[styles.item, item.done && styles.itemDone]}>
        <Text style={[styles.text, item.done && styles.textDone]}>
          {item.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
    elevation: 1,

    //El elevation de iOS se consigue con las siguientes propiedades
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 }

  }, 
    itemDone: {
      backgroundColor: "#d3ffd3"
  },
  text: {
    fontSize: 16
  },
  textDone: {
        textDecorationLine: "line-through",
        color: "#f69c9c"
  }
});