import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, FlatList } from 'react-native';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState('');
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleOkPress = () => {
    if (inputText.trim() !== '') {
      setTasks([...tasks, inputText]);
      setInputText('');
    }
    setModalVisible(false);
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    // Remove from completedTasks if the removed task was completed
    setCompletedTasks(completedTasks.filter((taskIndex) => taskIndex !== index));
  };

  const handleTaskPress = (index) => {
    // Toggle completion of task
    if (completedTasks.includes(index)) {
      setCompletedTasks(completedTasks.filter((taskIndex) => taskIndex !== index));
    } else {
      setCompletedTasks([...completedTasks, index]);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Create a task</Text>
      </TouchableOpacity>
      <Text style={styles.textContainer}>My Tasks</Text>
      <FlatList
        data={tasks}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              styles.taskContainer,
              completedTasks.includes(index) && { backgroundColor: 'green' }
            ]}
            onPress={() => handleTaskPress(index)}
          >
            <Text style={styles.taskItem}>{item}</Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveTask(index)}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter your task</Text>
            <TextInput
              style={styles.input}
              placeholder="Task"
              placeholderTextColor="#888"
              onChangeText={setInputText}
              value={inputText}
            />
            <TouchableOpacity style={styles.okButton} onPress={handleOkPress}>
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9A6735',
    alignItems: 'center',
    paddingTop: 60,
  },

  textContainer: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#850F8D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'white',
    marginTop: 20,
    marginBottom: 20,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },

  input: {
    height: 40,
    borderColor: '#850F8D',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: 200,
    color: '#000',
  },

  okButton: {
    backgroundColor: '#850F8D',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  okButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: 300,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },

  taskItem: {
    flex: 1,
    textAlign: 'center',
  },

  removeButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginLeft: 10,
  },

  removeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
