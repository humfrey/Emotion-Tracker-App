import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Assuming you're using MaterialIcons
import { getEmotionHistory } from '../utils/database';
const emotions = require('../components/emotions.json');

const RandomEmotionScreen = ({ navigate }) => {
  const [emotionHistory, setEmotionHistory] = useState([]);

    const fetchHistory = async () => {
        const history = await getEmotionHistory();
        setEmotionHistory(history);
    };

    useEffect(() => {
        fetchHistory();
    }, []);

  let flatEmotions = [];

  Object.keys(emotions).forEach(category => {
    Object.keys(emotions[category]).forEach(emote => {
      // console.log(emote)
      flatEmotions[emote] = emotions[category][emote]
    });
  });

  let feltEmotions = [];
  emotionHistory.forEach(feltEmote => {
    feltEmotions.push(feltEmote.emotion);
  });

  const unFeltEmotions = Object.keys(flatEmotions).filter(emote => { return !feltEmotions.includes(emote) });

  let randomEmotionName = unFeltEmotions[Math.floor(Math.random() * unFeltEmotions.length)];

  // console.log(unFeltEmotions)

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate('HomeScreen')}>
          <Icon name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>You haven't yet felt...</Text>
      </View>
      {randomEmotionName ? (
        <View style={styles.selectedEmotionContainer}>
          <Text style={styles.selectedEmotion}>{randomEmotionName}</Text>
          <Text style={styles.definitionText}>{flatEmotions[randomEmotionName]}</Text>
        </View>
      ) : null}
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

export default RandomEmotionScreen;
