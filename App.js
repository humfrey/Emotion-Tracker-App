import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import * as Notifications from 'expo-notifications';

import HomeScreen from './screens/HomeScreen.js';
import RecordEmotionScreen from './screens/RecordEmotionScreen.js';
import EmotionHistoryScreen from './screens/EmotionHistoryScreen.js';
import NotificationSetter from './components/NotificationSetter';
import RandomEmotionScreen from './screens/RandomEmotionScreen.js';

// Set the notification handler before the app is mounted
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("Home");

  // Use useEffect to configure anything that needs to run once on app startup
  useEffect(() => {
    // Any additional setup can go here
  }, []);

  const navigate = (screenName) => {
    setCurrentScreen(screenName);
  };

  let ScreenComponent = HomeScreen;
  if (currentScreen === "RecordEmotion") {
    ScreenComponent = RecordEmotionScreen;
  } else if (currentScreen === "EmotionHistory") {
    ScreenComponent = EmotionHistoryScreen;
  } else if (currentScreen === "RandomEmotion") {
    ScreenComponent = RandomEmotionScreen;
  }

  return (
    <View style={{ flex: 1 }}>
      <NotificationSetter />
      <ScreenComponent navigate={navigate} />
    </View>
  );
}
