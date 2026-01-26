import React, {useState} from 'react';

//FlatList es una lista que está optimizada para renderizar grandes cantidades de datos
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StatusBar
} from 'react-native';

import TaskItem from './components/TaskItem';
import Header from './components/Header';

export default function App() {

  //Inicializamos el input para introducir la tarea como un estado de cadena vacía
  const [ taskText, setTaskText ] = useState('');
    //Inicializamos el estado de las tareas como un array vacío
  const [ tasks, setTasks ] = useState([]);

  //Función para añadir una nueva tarea
  const handleAddTask = () => {

    //Evitamos añadir tareas vacías o solo con espacios
    if(!taskText.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      text: taskText.trim(),
      done: false
    };

    //Añadimos la nueva tarea al array de tareas, sin eliminar las anteriores (split operator)
    setTasks([newTask, ...tasks]);
    //Reseteamos el input texto
    setTaskText('');
  };



  //Función para alternar el estado de una tarea (completada/no completada)
  const handleToggleTask = (id) => {

    //Cambiamos el estado de la tarea cuyo id coincide con el id recibido a través del estado previo
      setTasks((prev) => 
        //Se recorre el array de tareas y se actualiza la tarea cuyo id coincide
        prev.map((task) => 
          //Si el id coincide, se crea una copia de la tarea con el estado 'done' invertido, si no, se devuelve la tarea sin cambios
        task.id === id ? {...task, done: !task.done} : task)
      );
  };

return(
  <View style={styles.safe}>
    <StatusBar barStyle="dark-content"/>
    <View style = {styles.container}>
      <Header />
      <View style ={styles.inputContainer}>
          <TextInput 
            style={styles.input}
            placeholder="Introduce una nueva tarea..."
            value={taskText}
            //Está llamando a la función setTaskText cada vez que el texto del input cambia
            onChangeText={setTaskText}
            //Ejecuta la función handleAddTask cuando se envía el formulario desde el teclado (intro)
            onSubmitEditing={handleAddTask}
          />
        </View>
        <Button title="Añadir Tarea" onPress={handleAddTask} />
    </View>
  </View>
);


};

const styles = StyleSheet.create({

  
});