import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import BottomNavBar from '../components/BottomNavBar.js';
import sampleEvents from '../sample_data/events.js';
import EventCard from '../components/EventCard.js';

const EventCatalog = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(sampleEvents.events);
  }, []);

  return (
    <View>
      <FlatList
        data={events}
        keyExtractor={(e) => e.id}
        renderItem={({ item }) => <EventCard event={item} />}
      />
      <BottomNavBar currentScreen="EventCatalog"/>
    </View>
  );
};

export default EventCatalog;
