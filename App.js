// App de tareas (ToDo) en React Native.
// - Guarda estado: texto del input (taskText) y lista de tareas (tasks)
// - Permite: añadir tareas y marcar/desmarcar como completadas
// - Renderiza: contador + lista optimizada (FlatList)
import React, { useState } from "react";

import {
  StyleSheet, // Para definir estilos (similar a CSS pero en JS)
  View, // Contenedor tipo <div>
  Text, // Texto visible en pantalla
  TextInput, // Campo de entrada de texto
  Button, // Botón nativo simple
  FlatList, // Lista optimizada para muchos elementos (mejor que map)
  StatusBar, // Controla apariencia de la barra superior (hora, batería, etc.)
} from "react-native";

import { SafeAreaProvider } from "react-native-safe-area-context";

import TaskItem from "./components/TaskItem";
import Header from "./components/Header";

export default function App() {
  //Inicializamos el input para introducir la tarea como un estado de cadena vacía
  const [taskText, setTaskText] = useState("");
  //Inicializamos el estado de las tareas como un array vacío
  //Cada tarea será un objeto con id, texto y estado (hecho/no hecho)
  const [tasks, setTasks] = useState([]);

  //Función para añadir una nueva tarea tras pulsar el button correspondiente
  const handleAddTask = () => {
    //Evitamos añadir tareas vacías o solo con espacios
    if (!taskText.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      text: taskText.trim(),
      done: false,
    };

    //Añadimos la nueva tarea al inicio del array de tareas, sin eliminar las anteriores (split operator)
    setTasks([newTask, ...tasks]);
    //Reseteamos el input texto
    setTaskText("");
  };

  //Función para alternar el estado de una tarea (completada/no completada)
  const handleToggleTask = (id) => {
    //Cambiamos el estado de la tarea cuyo id coincide con el id recibido a través del estado previo
    setTasks((prev) =>
      //Se recorre el array de tareas y se actualiza la tarea cuyo id coincide
      prev.map((task) =>
        //Si el id coincide, se crea una copia de la tarea con el estado 'done' invertido, si no, se devuelve la tarea sin cambios
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  };

  return (
    <SafeAreaProvider>
      <View style={styles.safe}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <Header />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Introduce una nueva tarea..."
              value={taskText}
              //Está llamando a la función setTaskText cada vez que el texto del input cambia
              onChangeText={setTaskText}
              //Ejecuta la función handleAddTask cuando se envía el formulario desde el teclado (intro)
              onSubmitEditing={handleAddTask}
            />
            <Button title="Añadir Tarea" onPress={handleAddTask} />
          </View>

          <Text style={styles.counter}>
            Tareas totales: {tasks.length} - Completadas:{" " + tasks.filter((task) => task.done).length}
          </Text>
          <FlatList
            //Recoge el array de tareas del estado que se van a renderizar
            data={tasks}
            //Establece la clave única para cada elemento de la lista (id de la tarea)
            keyExtractor={(item) => item.id}
            //renderItem recibe un objeto (elemento item de tasks) que representa cada tarea,
            // y devuelve un componente TaskItem con la tarea y la función de toggle
            renderItem={({ item }) => (
              <TaskItem item={item} onToggle={handleToggleTask} />
            )}
            //En caso de que la lista esté vacía, muestra un mensaje
            ListEmptyComponent={
              <Text style={styles.empty}>No hay tareas.</Text>
            }
            //Añade estilos a los que ya tenga aplicados el contendor
            contentContainerStyle={tasks.length === 0 && styles.emptyContainer}
          />
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  // Estilo del contenedor general (SafeAreaView)
  safe: {
    flex: 1, // ocupa toda la pantalla
    backgroundColor: "#f2f2f2", // gris claro de fondo
  },
  // Estilo del contenedor principal interno
  container: {
    flex: 1,
    paddingHorizontal: 16, // margen lateral
  },
  // Contenedor del input y del botón
  inputContainer: {
    flexDirection: "row", // colocamos los elementos en fila (horizontal)
    gap: 8, // separación entre input y botón
    marginBottom: 8, // espacio bajo el bloque
  },
  // Estilo del campo de texto
  input: {
    flex: 1, // ocupa todo el espacio disponible antes del botón
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  // Estilo del texto del contador
  counter: {
    fontSize: 14,
    marginBottom: 8,
    color: "#333",
  },
  // Estilo aplicado al contenedor de FlatList cuando está vacío
  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center", // centrado vertical
  },
  // Estilo del texto de "no hay tareas"
  empty: {
    textAlign: "center",
    color: "#777",
  },
});
