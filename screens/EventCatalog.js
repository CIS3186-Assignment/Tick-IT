import React, { useState, useEffect } from "react";
import { View, FlatList, RefreshControl } from "react-native";
import { TextInput, ActivityIndicator } from "react-native-paper";
import BottomNavBar from "../components/BottomNavBar.js";
import EventCard from "../components/EventCard.js";
import { getAllEvents } from "../services/EventService.js";

const EventCatalog = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchEvents = async () => {
    try {
      const events = await getAllEvents();
      setAllEvents(events);
      setFilteredEvents(events);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
      setRefreshing(false); // Set refreshing to false when the fetch is complete
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

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
  }, [query, allEvents]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchEvents();
  };

  return (
    <View>
      <TextInput
        label="Search..."
        value={query}
        onChangeText={(query) => setQuery(query)}
        left={<TextInput.Icon icon="magnify" color="#3700B3" />}
      />
      {loading ? (
        <ActivityIndicator animating={loading} color="#3700B3" size="large" />
      ) : (
        <FlatList
          data={filteredEvents}
          keyExtractor={(e) => e.id}
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

export default EventCatalog;
