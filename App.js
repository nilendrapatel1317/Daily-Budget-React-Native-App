import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';


// Notification Handling
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [dailyLimit, setDailyLimit] = useState(50); // Set Daily Budget Limit
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync();

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    // ✅ SetInterval to schedule notification every 1 minute
    const interval = setInterval(() => {
      scheduleNotification();
    }, 60000); // 60000ms = 1 minute

    return () => {
      clearInterval(interval);
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function scheduleNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "💰 Daily Budget Alert!",
        body: `Aaj ka budget Rs ${dailyLimit} hai. Usse zyada mat use krna!`,
      },
      trigger: { seconds: 5 }, // 5 sec ke baad notification aayega
    });
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 45 , margin: 10 , textAlign : 'center' }}>Daily Budget App 💰</Text>
      <Text style={{ fontSize: 30 , marginTop: 50  }}>Aaj ka budget</Text>
      <Text style={{ fontSize: 30 , marginBottom: 50  }}>Rs {dailyLimit} /-</Text>
      <Button title="🔔 Send Notification" onPress={scheduleNotification} />
    </View>
  );
}

// Function to Register Device for Notifications
async function registerForPushNotificationsAsync() {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Notification permissions required!');
      return;
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }
}
