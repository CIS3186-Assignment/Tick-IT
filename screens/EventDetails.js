import React, { useState } from 'react';
import { View, Image, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IconButton, Colors } from 'react-native-paper';
import TopAppBar from '../components/TopAppBar';

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

  const renderItem = ({ item }) => (
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

  return (
    <View style={styles.container}>
      <TopAppBar title={event?.name} />

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
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={() => (
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: event?.image }} />
          </View>
        )}
        ListFooterComponent={() => (
          <>
            <View style={styles.ticketContainer}>
              <View style={styles.ticketRow}>
                <Text style={styles.ticketLabel}>General Entry (€10)</Text>
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
                <Text style={styles.ticketLabel}>VIP Ticket(€20)</Text>
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
              <View>
                <Text style={styles.total}>Total: €</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Purchase Tickets</Text>
            </TouchableOpacity>
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginHorizontal: 20,
    marginBottom: 30,
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
    backgroundColor: '#253354',
    padding: 20,
    borderRadius: 5,
    marginHorizontal: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconButton: {
    marginRight: 10,
  },
  total: {
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default EventDetails;
