import React, { useState } from 'react';
import { View, Image, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IconButton, Colors } from 'react-native-paper';

const EventDetails = ({ route }) => {
  const { event } = route.params;
  const navigation = useNavigation();
  const details = event.details || [];

  const [vipTicketCount, setVipTicketCount] = useState(0);
  const [generalTicketCount, setGeneralTicketCount] = useState(0);

  const handleCardPress = () => {
    navigation.navigate('EventCatalog');
  };

  const handleTicketCountChange = (type, change) => {
    if (type === 'vip') {
      setVipTicketCount((prevCount) => Math.max(0, prevCount + change));
    } else if (type === 'general') {
      setGeneralTicketCount((prevCount) => Math.max(0, prevCount + change));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <IconButton
          icon="chevron-left"
          color="#FFFFFF"
          size={40}
          style={styles.iconButton}
          onPress={handleCardPress}
        />
        <Text style={styles.eventName}>{event.name}</Text>
      </View>

      <Image style={styles.image} source={{ uri: event?.image }} />

      <View style={styles.gridContainer}>
        <FlatList
          data={[
            { label: 'Creator', value: event.creator.name },
            { label: 'Category', value: event.category.name },
            {
              label: 'Location',
              value: event.location,
              withIcon: true,
            },
            { label: 'Date and Time', value: event.datetime },
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

      <View style={styles.ticketContainer}>
        <View style={styles.ticketRow}>
          <Text style={styles.ticketLabel}>VIP Tickets</Text>
          <View style={styles.ticketCountContainer}>
            <IconButton
              icon="minus"
              size={20}
              style={styles.iconButton}
              onPress={() => handleTicketCountChange('vip', -1)}
            />
            <Text style={styles.ticketCount}>{vipTicketCount}</Text>
            <IconButton
              icon="plus"
              size={20}
              style={styles.iconButton}
              onPress={() => handleTicketCountChange('vip', 1)}
            />
          </View>
        </View>

        <View style={styles.ticketRow}>
          <Text style={styles.ticketLabel}>General Entry Tickets</Text>
          <View style={styles.ticketCountContainer}>
            <IconButton
              icon="minus"
              size={20}
              style={styles.iconButton}
              onPress={() => handleTicketCountChange('general', -1)}
            />
            <Text style={styles.ticketCount}>{generalTicketCount}</Text>
            <IconButton
              icon="plus"
              size={20}
              style={styles.iconButton}
              onPress={() => handleTicketCountChange('general', 1)}
            />
          </View>
        </View>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3700B3',
    padding: 15,
    width: '100%',
  },
  iconButton: {
    marginRight: 10,
  },
  eventName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  gridContainer: {
    flex: 1,
    width: '100%',
    padding: 10,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
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
    marginTop: 20,
    paddingHorizontal: 10,
  },
  ticketRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
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
    fontSize: 16,
    marginHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: '#3700B3',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EventDetails;
