import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { getEventById } from '../services/EventService.js';

const NotificationHandler = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(async (response) => {
      console.log("clicked notification",response);
      console.log("open id",response.notification.request.content.data.eventId);
      const event = await getEventById(response.notification.request.content.data.eventId);
      console.log("event",event)
      navigation.navigate("EventDetails", { event });
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return <></>
};

export default NotificationHandler;