// App de tareas (ToDo) en React Native con multipantalla.
// - Guarda estado: texto del input (taskText) y lista de tareas (tasks)
// - Permite: añadir tareas y marcar/desmarcar como completadas
// - Renderiza: contador + lista optimizada (FlatList)
import React, { useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import DoneTasksScreen from "./screens/DoneTasksScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: "Tareas" }} 
        />
        <Stack.Screen 
          name="DoneTasks" 
          component={DoneTasksScreen} 
          options={{ title: "Tareas completadas" }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}