import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the key used for storing emotion records
const EMOTION_RECORDS_KEY = 'emotionRecords';

// Function to save an emotion record
const saveEmotion = async (emotion) => {
  try {
    const existingRecords = await AsyncStorage.getItem(EMOTION_RECORDS_KEY);
    const emotionRecords = existingRecords ? JSON.parse(existingRecords) : [];

    // Create a new emotion record with a timestamp
    const emotionRecord = {
      emotion: emotion,
      timestamp: new Date().toISOString(),
    };

    // Add the new emotion record to the array
    emotionRecords.push(emotionRecord);

    // Save the updated array back to AsyncStorage
    await AsyncStorage.setItem(EMOTION_RECORDS_KEY, JSON.stringify(emotionRecords));

    console.log('Saved emotion record:', JSON.stringify(emotionRecord));
  } catch (error) {
    console.error('Error saving emotion record:', error);
  }
};

// Function to retrieve all emotion records
const getEmotionHistory = async () => {
  try {
    const existingRecords = await AsyncStorage.getItem(EMOTION_RECORDS_KEY);
    return existingRecords ? JSON.parse(existingRecords) : [];
  } catch (error) {
    console.error('Error retrieving emotion records:', error);
    return [];
  }
};

const deleteEmotionByTimestamp = async (timestamp) => {
  try {
    const existingRecords = await AsyncStorage.getItem(EMOTION_RECORDS_KEY);
    let emotionRecords = existingRecords ? JSON.parse(existingRecords) : [];

    // Filter out the record with the given timestamp
    emotionRecords = emotionRecords.filter(record => record.timestamp !== timestamp);

    // Save the updated array back to AsyncStorage
    await AsyncStorage.setItem(EMOTION_RECORDS_KEY, JSON.stringify(emotionRecords));

    console.log(`Deleted emotion record with timestamp: ${timestamp}`);
  } catch (error) {
    console.error('Error deleting emotion record:', error);
  }
};

export { saveEmotion, getEmotionHistory, deleteEmotionByTimestamp, EMOTION_RECORDS_KEY };
