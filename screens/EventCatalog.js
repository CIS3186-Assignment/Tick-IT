import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import BottomNavBar from '../components/BottomNavBar.js';
import sampleEvents from '../sample_data/events.js';

import EventCard from '../components/EventCard.js';
import { TextInput, Chip } from 'react-native-paper';


const EventCatalog = () => {
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    setEvents(sampleEvents.events);
  }, []);

const handleChipPress = (categoryId) => {
    // Check if the category is already in filters
    if (filters.includes(categoryId)) {
      // If selected, remove it from filters
      setFilters((prevFilters) => prevFilters.filter((filter) => filter !== categoryId));
    } else {
      // If not selected, add it to filters
      setFilters((prevFilters) => [...prevFilters, categoryId]);
    }

    // Update filteredEvents based on filters
    if(filters.length === 0)
      updatedFilteredEvents=events
    else 
      updatedFilteredEvents = events.filter((event) => filters.includes(event.categoryId));
    setEvents(updatedFilteredEvents);
};

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

  return (
    <View style={{ ...styles.container, backgroundColor: '#253354' }}>
      <TextInput
        style={styles.search_bar}
        label="Search..."
        value={query}
        onChangeText={(query) => setQuery(query)}
        left={<TextInput.Icon icon="magnify" color="#3700B3" />}
      />
      
      {/* Ghal meta inzidu il CategoryFilters */}
      <View style={styles.filter}>
        <FlatList
          data={[
            { id: 1, title: "Party" },
            { id: 2, title: "Concert" },
            { id: 3, title: "Sports" },
            { id: 4, title: "Workshops" },
            { id: 5, title: "Food & Drink" },
            { id: 6, title: "Adventure" },
            { id: 7, title: "Art & Culture" },
            { id: 8, title: "Academic" },
          ]}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filter_items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => 
          <Chip 
              style={styles.category_chips}
              selected={filters.includes(item.id)}
              onPress={() => handleChipPress(item.id)}>
              {item.title}
          </Chip>}
        />
      </View>

      <FlatList
        data={events}
        style={styles.flatList}
        showsVerticalScrollIndicator={false}
        keyExtractor={(e) => e.id.toString()}
        renderItem={({ item }) => <EventCard event={item}/>}
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
  },
  category_chips:{
    marginRight: 10,
    backgroundColor: '#ffff',
    borderRadius: 20
  }
});

export default EventCatalog;
