import React, { useState, useEffect } from "react";
import { View, FlatList, RefreshControl, Text, StyleSheet } from "react-native";
import { TextInput, ActivityIndicator, Chip } from "react-native-paper";
import BottomNavBar from "../components/BottomNavBar.js";
import EventCard from "../components/EventCard.js";
import { getAllEvents } from "../services/EventService.js";

const EventCatalog = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchEvents = async () => {
    try {
      const events = await getAllEvents();
      setAllEvents(events);
      setFilteredEvents(events);
      console.log("fetched")
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEvents();
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
    if (!query) {
      setFilteredEvents(allEvents);
    } else {
      const filteredEvents = allEvents.filter(
        (event) =>
          event.name.toLowerCase().includes(query.toLowerCase()) ||
          event.location_name.toLowerCase().includes(query.toLowerCase()) ||
          event.eventCreator.name.toLowerCase().includes(query.toLowerCase()) ||
          event.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredEvents(filteredEvents);
    }
  }, [query]);
  
   const onRefresh = () => {
    setRefreshing(true);
    fetchEvents();
  };

  
  return (
    <View style={{ ...styles.container, backgroundColor: '#141414' }}>
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
          <View style={styles.chips}>
            <Chip 
              style={styles.category_chips}
              selected={filters.includes(item.id)}
              onPress={() => handleChipPress(item.id)}>
              {item.title}
          </Chip>
          </View>
          }
        />
      </View>

      {loading ? (
        <ActivityIndicator animating={loading} color="#3700B3" size="large" />
      ) : (
        <FlatList
          data={filteredEvents}
          keyExtractor={(e) => e.id.toString()}
          style={styles.eventCard}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <EventCard event={item} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
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
    marginBottom: 0,
  },
  filter: {
    marginVertical: 0,
    borderBottomWidth: 0.7,
    borderColor: 'white',
  },
  filter_items: {
    marginVertical: 15,
    marginHorizontal: 0,
    paddingHorizontal: 20
  },
  category_chips:{
    marginRight: 5,
    backgroundColor: '#ffff',
    borderRadius: 20
  },
  chips: {
    marginRight: 20,
    paddingRight: 10,
  }
});

export default EventCatalog;
