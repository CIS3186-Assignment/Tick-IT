import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import BottomNavBar from '../components/BottomNavBar.js';
import sampleEvents from '../sample_data/events.js';

import EventCard from '../components/EventCard.js';
import { TextInput } from 'react-native-paper';

const EventCatalog = () => {
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
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

  // Dummy Data ghal filters
  const emptyItems = Array.from({ length: 6 }, (_, index) => ({ id: index.toString() }));

  const renderEmptyItem = ({ item, style }) => (
    <View style={[styles.emptyItem, style]}>
      <Text>{"Category"}</Text>
    </View>
  );

  return (
    <View style={{ ...styles.container, backgroundColor: '#253354' }}>
      <TextInput
        style={styles.search_bar}
        label="Search..."
        value={query}
        onChangeText={(query) => setQuery(query)}
        left={<TextInput.Icon icon="magnify" color="#3700B3" />}
      />
      
      {/* Ghal meta inzidu il Categories/Filters */}
      <View style={styles.filter}>
        <FlatList
          data={emptyItems}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filter_items}
          keyExtractor={(item) => item.id}
          renderItem={renderEmptyItem}
        />
      </View>

      <FlatList
        data={events}
        style={styles.flatList}
        showsVerticalScrollIndicator={false}
        keyExtractor={(e) => e.id.toString()}
        renderItem={({ item }) => <EventCard event={item} style={styles.eventCard} />}
      />
      <BottomNavBar currentScreen="EventCatalog" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  search_bar: {
    marginTop: 55,
    marginHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderRadius: 20,
    backgroundColor: '#FFFFFF'
  },
  emptyItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  flatList: {
    paddingHorizontal: 20,
    backgroundColor: '#141414'
  },
  eventCard: {
    margin: 20,
  },
  filter: {
    marginVertical: 10
  },
  filter_items: {
    marginVertical: 15,
    marginHorizontal: 0,
    paddingHorizontal: 20
  }
});

export default EventCatalog;
