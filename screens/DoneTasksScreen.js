import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import TaskItem from '../components/TaskItem';

export default function DoneTasksScreen({route }) {

    const {tasks, onToggle} = route.params;
    const doneTasks = tasks.filter(task => task.done);

    return (
        <View style={styles.container}>
            <FlatList
                data={doneTasks}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => 
                    <TaskItem task={item} onToggle={onToggle} />
                }
                ListEmptyComponent={
                    <Text style={styles.empty}>No hay tareas completadas</Text>
                }
                contentContainerStyle = {doneTasks.length === 0 && styles.emptyContainer}
            />
        </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
    emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  empty: {
    textAlign: "center",
    color: "#777",
  },
})