import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { getEventById } from "../services/EventService.js";
import { registerForPushNotificationsAsync } from "../services/NotificationService.js";

const NotificationHandler = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      async (response) => {
        const event = await getEventById(
          response.notification.request.content.data.eventId
        );
        navigation.navigate("EventDetails", { event });
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      const subscription = Notifications.addNotificationReceivedListener(
        (notification) => {
          console.log("showed notification", notification);
        }
      );

      return () => {
        subscription.remove();
      };
    });
  }, []);

  return <></>;
};

export default NotificationHandler;
