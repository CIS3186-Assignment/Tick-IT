import React, { useState } from 'react';
import { View, Image, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IconButton, Colors } from 'react-native-paper';
import TopAppBar from '../components/TopAppBar';

const EventDetails = ({ route }) => {
  const { event } = route.params;
  const navigation = useNavigation();
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

      <Image style={styles.image} source={{ uri: event?.image }} />

      <View style={styles.gridContainer}>
        <FlatList
          data={[
            { label: 'Creator', value: event.eventCreator.name },
            { label: 'Category', value: event.Category.name },
            {
              label: 'Location',
              value: event.location_name,
              withIcon: true,
            },
            { label: 'Date and Time', value: formatDate(event.date) },
            { label: 'Description', value: event.description },
          ]}
          renderItem={({ item }) => (
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
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <FlatList
        data={event.tickets}
        renderItem={({ item }) => (
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
        )}
        keyExtractor={(item) => item.name}
      />
      <View>
        <Text style={styles.total}>Total: €</Text>
      </View>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Purchase</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10, 
    paddingHorizontal: 20, 
  },
  gridLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  gridValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gridValue: {
    fontSize: 16,
    marginRight: 5,
  },
  ticketContainer: {
    borderColor: '#253354',
    borderTopWidth: 5,
    marginVertical: 20,
    marginBottom: 0,
    backgroundColor: '#fff'
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
  iconButton: {
    margin: -10
  },
  total: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 10,
    marginBottom: 20
  },
  
});

export default EventDetails;
