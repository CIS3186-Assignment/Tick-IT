import React, { useState, useEffect } from "react";
import { View, FlatList, RefreshControl, StyleSheet } from "react-native";
import { ActivityIndicator, Chip, Searchbar } from "react-native-paper";
import { getAllEvents } from "../services/EventService.js";
import { getDownloadURL, ref } from "firebase/storage";
import { STORAGE } from "../FirebaseConfig.js";
import EventCard from "../components/EventCard.js";
import BottomNavBar from "../components/BottomNavBar.js";
import { getCategories } from "../services/CategoriesService.js";
import customTheme from "../theme.js";

const EventCatalog = () => {
  const [categories, setCategories] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchImagesForEvents = async (events) => {
    try {
      const eventsWithImages = await Promise.all(
        events.map(async (event) => {
          try {
            const imageRef = ref(STORAGE, `images/${event.image_id}.png`);
            const imageURL = await getDownloadURL(imageRef);

            return { ...event, imageURL };
          } catch (error) {
            console.error(
              "Error fetching image URL for event:",
              event.id,
              error
            );
            return { ...event, imageURL: null };
          }
        })
      );

      setFilteredEvents(eventsWithImages);
    } catch (error) {
      console.error("Error fetching images for events:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const events = await getAllEvents();
      setAllEvents(events);
      setFilteredEvents(events);

      await fetchImagesForEvents(events);
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
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChipPress = (categoryId) => {
    if (filters.includes(categoryId)) {
      setFilters((prevFilters) =>
        prevFilters.filter((filter) => filter !== categoryId)
      );
    } else {
      setFilters((prevFilters) => [...prevFilters, categoryId]);
    }
  };

  useEffect(() => {
    let filteredEvents = allEvents;

    if (query) {
      filteredEvents = allEvents.filter(
        (event) =>
          event.name.toLowerCase().includes(query.toLowerCase()) ||
          event.location_name.toLowerCase().includes(query.toLowerCase()) ||
          event.eventCreator.name.toLowerCase().includes(query.toLowerCase()) ||
          event.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (filters.length > 0) {
      filteredEvents = filteredEvents.filter((event) =>
        filters.includes(event.category.id)
      );
    }

    fetchImagesForEvents(filteredEvents);
  }, [query, filters]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchEvents();
  };

  return (
    <View style={{ ...styles.container }}>
      <Searchbar
        placeholder="Search"
        theme={{ colors: { primary: customTheme.colors.background } }}
        onChangeText={setQuery}
        value={query}
        accessibilityLabel="Search events"
        style={styles.search_bar}
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
                accessibilityLabel={`Filter by ${item.name} category`}
              >
                {item.name}
              </Chip>
            </View>
          )}
        />
      </View>

      {loading ? (
         <View style={styles.loadingContainer}>
         <ActivityIndicator
           animating={loading}
           size="large"
           color={customTheme.colors.onPrimary}
         />
       </View>
      ) : (
        <FlatList
          data={filteredEvents}
          keyExtractor={(e) => e.id.toString()}
          style={styles.eventCard}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <EventCard
              event={item}
              imageURL={item.imageURL}
              accessibilityLabel={`Event: ${item.name}`}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}

      <View style={styles.bottomNavBarContainer}>
        <BottomNavBar currentScreen="EventCatalog" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: customTheme.colors.background,
  },
  search_bar: {
    marginTop: 55,
    marginHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderRadius: 20,
  },
  eventCard: {
    marginBottom: 60,
  },
  filter: {
    marginVertical: 0,
    borderBottomWidth: 0.7,
    borderColor: customTheme.colors.onPrimary,
  },
  filter_items: {
    marginVertical: 15,
    marginHorizontal: 0,
    paddingHorizontal: 20,
  },
  category_chips: {
    marginRight: 5,
    backgroundColor: customTheme.colors.primaryContainer,
    borderRadius: 20,
  },
  chips: {
    marginRight: 20,
    paddingRight: 10,
  },
  bottomNavBarContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#141414",
  },
});

export default EventCatalog;
