// EmotionPicker.js
import React, { useState } from 'react';
import { View, Text, Modal, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const emotions = require('./emotions.json');

const EmotionPicker = ({ onEmotionSelected }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const showCategoryPicker = () => {
    setSelectedCategory(null);
    setIsModalVisible(true);
  };

  const openModal = (category) => {
    setSelectedCategory(category);
    setIsModalVisible(true);
  };

  const selectEmotion = (emotion) => {
    setIsModalVisible(false);
    onEmotionSelected(emotion);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling?</Text>
      <Button title="Select Emotion" onPress={showCategoryPicker} />

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalView}>
          <FlatList
            data={selectedCategory ? Object.keys(emotions[selectedCategory]) : Object.keys(emotions)}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => (selectedCategory ? selectEmotion(item) : openModal(item))}
              >
                <Text style={styles.itemText}>{selectedCategory ? `${item}` : item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <Button title={selectedCategory ? "Go Back" : "Cancel"} onPress={() => selectedCategory ? setSelectedCategory(null) : setIsModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    marginTop: 50,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  item: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  pickerContainer: {
    width: '100%',
    marginVertical: 10,
  },
  picker: {
    width: '100%',
  },
dropdownButton: {
  width: '100%',
  padding: 15,
  backgroundColor: '#DDD',
  borderRadius: 5,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 10,
},
dropdownButtonText: {
  fontSize: 16,
  color: '#333',
}
});

export default EmotionPicker;






