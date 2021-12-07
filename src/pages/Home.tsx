import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    if (tasks.find(task => task.title === newTaskTitle)) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
      return;
    }

    setTasks([...tasks, data]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTask = tasks.map(task => ({ ...task }));

    const foundItem = updatedTask.find(task => task.id === id);
    if (!foundItem) {
      return
    }
    foundItem.done = !foundItem.done;
    setTasks(updatedTask);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            const updatedTask = tasks.filter(task => task.id !== id);
            setTasks(updatedTask);
          }
        }
      ]
    )
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs) {
    const updatedTask = tasks.map(task => ({ ...task }));

    const updatedTaskTitle = updatedTask.find(task => task.id === taskId);
    if (!updatedTaskTitle) {
      return
    }
    updatedTaskTitle.title = taskNewTitle;
    setTasks(updatedTask);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})