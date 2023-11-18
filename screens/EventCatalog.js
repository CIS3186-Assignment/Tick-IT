import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import BottomNavBar from "../components/BottomNavBar.js";
import sampleEvents from "../sample_data/events.js";
import EventCard from "../components/EventCard.js";
import { TextInput } from "react-native-paper";
import {getAllEvents} from "../services/EventService.js"

const EventCatalog = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [query, setQuery] = useState("");

  const fetchEvents = async () => {
    try {
      const events = await getAllEvents();
      setAllEvents(events);
      setFilteredEvents(events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  
  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    fetchEvents() // refetch events when query changes to get most recent events
    if (!query) {
      setFilteredEvents(allEvents)
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

  // TODO -> STYLING
  return (
    <View>
      <TextInput
        label="Search..."
        value={query}
        onChangeText={(query) => setQuery(query)}
        left={<TextInput.Icon icon="magnify" color="#3700B3" />}
      />
      <FlatList
        data={filteredEvents}
        keyExtractor={(e) => e.id}
        renderItem={({ item }) => <EventCard event={item} />}
      />
      <BottomNavBar currentScreen="EventCatalog" />
    </View>
  );
};

export default EventCatalog;
