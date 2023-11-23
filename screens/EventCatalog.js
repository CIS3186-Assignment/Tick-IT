import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  StyleSheet,
  Image,
  Text,
} from "react-native";
import { TextInput, ActivityIndicator, Chip } from "react-native-paper";
import { getAllEvents } from "../services/EventService.js";
import { getDownloadURL, ref } from "firebase/storage";
import { STORAGE } from "../FirebaseConfig.js";
import EventCard from "../components/EventCard.js";
import BottomNavBar from "../components/BottomNavBar.js";
import { getCategories } from "../services/CategoriesService.js";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry.js";

const EventCatalog = () => {
  const [categories, setCategories] = useState([]);
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
      console.log("fetched");

      // Fetch download URLs for images
      const eventsWithImages = await Promise.all(
        events.map(async (event) => {
          try {
            const imageRef = ref(STORAGE, `images/${event.image_id}.png`);
            const imageURL = await getDownloadURL(imageRef);

            return { ...event, imageURL };
          } catch (error) {
            return { ...event, imageURL: null };
          }
        })
      );

      setFilteredEvents(eventsWithImages);
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

  const fetchCategories = async () => {
    try {
      const categories = await getCategories();
      setCategories(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChipPress = (categoryId) => {
    // Check if the category is already in filters
    if (filters.includes(categoryId)) {
      // If selected, remove it from filters
      setFilters((prevFilters) =>
        prevFilters.filter((filter) => filter !== categoryId)
      );
    } else {
      // If not selected, add it to filters
      setFilters((prevFilters) => [...prevFilters, categoryId]);
    }

    // Update filteredEvents based on filters
    if (filters.length === 0) updatedFilteredEvents = events;
    else
      updatedFilteredEvents = events.filter((event) =>
        filters.includes(event.categoryId)
      );
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
    <View style={{ ...styles.container, backgroundColor: "#141414" }}>
      <TextInput
        style={styles.search_bar}
        label="Search..."
        value={query}
        onChangeText={(query) => setQuery(query)}
        left={<TextInput.Icon icon="magnify" color="#3700B3" />}
      />

      <View style={styles.filter}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filter_items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.chips}>
              <Chip
                style={styles.category_chips}
                selected={filters.includes(item.id)}
                onPress={() => handleChipPress(item.id)}
              >
                {item.name}
              </Chip>
            </View>
          )}
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
          renderItem={({ item }) => (
            <EventCard event={item} imageURL={item.imageURL} />
          )}
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
    position: "relative",
  },
  search_bar: {
    marginTop: 55,
    marginHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
  },
  eventCard: {
    marginBottom: 0,
  },
  filter: {
    marginVertical: 0,
    borderBottomWidth: 0.7,
    borderColor: "white",
  },
  filter_items: {
    marginVertical: 15,
    marginHorizontal: 0,
    paddingHorizontal: 20,
  },
  category_chips: {
    marginRight: 5,
    backgroundColor: "#ffff",
    borderRadius: 20,
  },
  chips: {
    marginRight: 20,
    paddingRight: 10,
  },
});

export default EventCatalog;
