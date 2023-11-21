import React, { useState } from 'react';
import { View, Image, StyleSheet, FlatList, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import TopAppBar from '../components/TopAppBar';

const EventDetails = ({ route }) => {
  const { event } = route.params;
  const navigation = useNavigation();
  const details = event.details || {};

  const [ticketCounts, setTicketCounts] = useState({});

  const handleTicketCountChange = (ticketType, change) => {
    const currentCount = ticketCounts[ticketType] || 0;
    const newCount = Math.max(0, currentCount + change);

    setTicketCounts((prevCounts) => ({
      ...prevCounts,
      [ticketType]: newCount,
    }));
  };

  const handleCardPress = () => {
    navigation.navigate('EventCatalog');
  };

  const formatDate = (timestamp) => {
    if (!timestamp) {
      return 'N/A';
    }

    const date = new Date(timestamp.toDate());
    const options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };

    return new Intl.DateTimeFormat('en-GB', options).format(date);
  };

  return (
    <View style={styles.container}>
      <TopAppBar title={event.name} />
  
      <FlatList
        ListHeaderComponent={
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: event?.image }} />
          </View>
        }
        data={[
          { type: 'grid', label: 'Creator', value: event.eventCreator.name },
          { type: 'grid', label: 'Category', value: event.Category.name },
          {
            type: 'grid',
            label: 'Location',
            value: event.location_name,
            withIcon: true,
          },
          { type: 'grid', label: 'Date and Time', value: formatDate(event.date) },
          { type: 'grid', label: 'Description', value: event.description },
          ...event.tickets.map(ticket => ({ type: 'ticket', ...ticket })),
          { type: 'button' },
        ]}
        renderItem={({ item }) => {
          if (item.type === 'grid') {
            return (
              <View style={styles.gridRow}>
                <Text style={styles.gridLabel}>{item.label}</Text>
                <View style={styles.gridValueContainer}>
                  <Text style={styles.gridValue}>{item.value}</Text>
                  {item.withIcon && (
                    <IconButton
                      icon="map-marker"
                      size={20}
                      style={styles.iconButton}
                      onPress={handleCardPress}
                    />
                  )}
                </View>
              </View>
            );
          } else if (item.type === 'ticket') {
            return (
              <View style={styles.ticketContainer}>
                <View style={styles.ticketRow}>
                  <Text style={styles.ticketLabel}>{item.name}</Text>
                  <View style={styles.ticketCountContainer}>
                    <IconButton
                      icon="minus"
                      size={20}
                      style={styles.iconButton}
                      onPress={() => handleTicketCountChange(item.name, -1)}
                    />
                    <Text style={styles.ticketCount}>{ticketCounts[item.name] || 0}</Text>
                    <IconButton
                      icon="plus"
                      size={20}
                      style={styles.iconButton}
                      onPress={() => handleTicketCountChange(item.name, 1)}
                    />
                  </View>
                </View>
              </View>
            );
          } else if (item.type === 'button') {
            return (
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Purchase</Text>
              </TouchableOpacity>
            );
          }
          return null; // or handle other types as needed
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aaa',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '70%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 25,
    marginVertical: 20,
    backgroundColor: '#000',
    alignSelf: 'center', // Center the image horizontally
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingLeft: 30,
    paddingRight: 20
  },
  gridLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flexShrink: 1,
  },
  gridValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '25', // Add marginLeft for spacing
    flex: 1,
  },
  gridValue: {
    fontSize: 16,
    color: '#FFFFFF',
    marginRight: 10, // Add marginRight for spacing
    flex: 1,
    flexWrap: 'wrap', // Allow value to wrap to the next line
  },
  iconButton: {
    margin: -10,
  },
  descriptionContainer: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  ticketContainer: {
    borderColor: '#253354',
    borderTopWidth: 5,
    marginVertical: 20,
    marginBottom: 0,
    backgroundColor: '#fff',
  },
  ticketRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 25,
    marginBottom: 20,
  },
  ticketLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ticketCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ticketCount: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: '#253354',
    padding: 20,
    borderRadius: 5,
    marginHorizontal: 45,
    marginBottom: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  total: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 10,
    marginBottom: 20,
    color: '#000',
  },
});

export default EventDetails;