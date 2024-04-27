import React from 'react';
import * as Notifications from 'expo-notifications';

export default class NotificationSetter extends React.Component {

  componentDidMount() {
    this.registerForNotifications();
    this.scheduleNotifications();
  }

  // Register for notifications
  async registerForNotifications() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need notification permissions to make this work!');
      return;
    }
  }

  // Schedule notifications
  async scheduleNotifications() {
    // Clear all previous notifications
    await Notifications.cancelAllScheduledNotificationsAsync();
    
    const localNotification = {
      title: 'How do you feel?',
      body: 'Tap to record your current emotion.',
      sound: true, // Make a sound
      priority: Notifications.AndroidNotificationPriority.HIGH, // Set priority for Android
      vibrate: true, // Vibrate on notification
    };

    const schedulingOptions = (hour) => ({
      hour,
      minute: 0,
      repeats: true,
    });

    // Schedule the notifications for 8am, 11am, 3pm, 6pm, 9pm
    const notificationHours = [8, 11, 15, 18, 21];
    for (const hour of notificationHours) {
      await Notifications.scheduleNotificationAsync({
        content: localNotification,
        trigger: schedulingOptions(hour),
      });
    }
  }

  render() {
    return null;
  }
}
