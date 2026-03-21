// App de tareas (ToDo) en React Native con multipantalla.
// - Guarda estado: texto del input (taskText) y lista de tareas (tasks)
// - Permite: añadir tareas y marcar/desmarcar como completadas
// - Renderiza: contador + lista optimizada (FlatList)
import React from "react";
import HomeScreen from "./screens/HomeScreen";
import DoneTasksScreen from "./screens/DoneTasksScreen";
import MapScreen from "./screens/MapScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/*Pantalla principal*/}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: "Tareas" }} 
        />
        {/*Pantalla de tareas completadas*/}
        <Stack.Screen 
          name="DoneTasks" 
          component={DoneTasksScreen} 
          options={{ title: "Tareas completadas" }} 
        />
        {/*Pantalla de mapa*/}
        <Stack.Screen 
          name="Map" 
          component={MapScreen} 
          options={{ title: "Mapa" }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}