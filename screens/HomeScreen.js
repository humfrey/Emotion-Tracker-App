import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, TouchableNativeFeedback } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const MaterialButton = ({ icon, title, onPress }) => {
  const ButtonComponent = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent onPress={onPress} background={TouchableNativeFeedback.Ripple('#AAF', true)}>
        <View style={styles.button}>
          {icon && <MaterialIcons name={icon} size={24} color="#ffffff" />}
          <Text style={styles.buttonText}>{title}</Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

const HomeScreen = ({ navigate }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emotion Tracker</Text>

      <MaterialButton
        icon="add-circle-outline"
        title="Record Emotion"
        onPress={() => navigate('RecordEmotion')}
      />

      <MaterialButton
        icon="history"
        title="View Emotion History"
        onPress={() => navigate('EmotionHistory')}
      />

      <MaterialButton
        icon="casino"
        title="Random Emotion"
        onPress={() => navigate('RandomEmotion')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 48,
  },
  buttonContainer: {
    borderRadius: 25,
    overflow: 'hidden',
    marginVertical: 8,
  },
  button: {
    backgroundColor: '#6200EE', // Material Design purple color
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    marginLeft: 8, // Add spacing between icon and text
  },
});

export default HomeScreen;
