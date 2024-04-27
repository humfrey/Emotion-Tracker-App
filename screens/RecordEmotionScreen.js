import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import EmotionPicker from '../components/EmotionPicker';
import { saveEmotion } from '../utils/database';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Assuming you're using MaterialIcons
const emotions = require('../components/emotions.json');

const RecordEmotionScreen = ({ navigate }) => {
  const [emotion, setEmotion] = useState('');
  const [definition, setDefinition] = useState(''); // New state for the emotion definition

  const handleEmotionSelected = (selectedEmotion) => {
    setEmotion(selectedEmotion);
    // Find and set the definition of the selected emotion
    Object.keys(emotions).forEach(category => {
      if (emotions[category][selectedEmotion] !== undefined) {
        setDefinition(emotions[category][selectedEmotion]);
      }
    });
  };

  const handleSubmitEmotion = async () => {
    if (emotion) {
      try {
        await saveEmotion(emotion);
        navigate('HomeScreen');
      } catch (error) {
        Alert.alert('Failed to record emotion.');
        console.error(error);
      }
    } else {
      Alert.alert('Please select an emotion.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate('HomeScreen')}>
          <Icon name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Record Your Emotion</Text>
      </View>
      <EmotionPicker onEmotionSelected={handleEmotionSelected} />
      {emotion ? (
        <View style={styles.selectedEmotionContainer}>
          <Text style={styles.selectedEmotion}>{emotion}</Text>
          <Text style={styles.definitionText}>{definition}</Text>
        </View>
      ) : null}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitEmotion}>
        <Icon name="check-circle" size={24} color="white" />
        <Text style={styles.submitButtonText}>Submit Emotion</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  selectedEmotion: {
    fontSize: 26,
    margin: 20,
    textAlign: 'center',
  },
  definitionText: { // Style for the definition text
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'left',
  },
  submitButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#0066CC',
    borderRadius: 25,
    margin: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  selectedEmotionContainer: {
    marginTop: 50,
    width: '80%',
    marginLeft: '10%'
  }
});

export default RecordEmotionScreen;
