import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import BottomNavBar from '../components/BottomNavBar.js';
import sampleEvents from '../sample_data/events.js';
import EventCard from '../components/EventCard.js';
import { TextInput } from 'react-native-paper';

const EventCatalog = () => {
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    sampleEvents.events = sampleEvents.events.slice(0,3)
    setEvents(sampleEvents.events);
  }, []);

  useEffect(() => {
    const filteredEvents = sampleEvents.events.filter(
      (event) =>
        event.name.toLowerCase().includes(query.toLowerCase()) ||
        event.location.toLowerCase().includes(query.toLowerCase()) ||
        event.creator.name.toLowerCase().includes(query.toLowerCase()) ||
        event.description.toLowerCase().includes(query.toLowerCase())
    );
    setEvents(filteredEvents);
  }, [query]);

  // TODO -> STYLING
  return (
    <View>
      <TextInput
        label="Search..."
        value={query}
        onChangeText={query => setQuery(query)}
        left={<TextInput.Icon icon="magnify" color="#3700B3"/>}
      />
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
