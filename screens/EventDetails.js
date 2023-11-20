import React, { useState } from 'react';
import { View, Image, StyleSheet, FlatList, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IconButton, Colors } from 'react-native-paper';
import TopAppBar from '../components/TopAppBar';

const EventDetails = ({ route }) => {
  const { event } = route.params;
  const navigation = useNavigation();
  const details = event.details || [];

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

  const renderItem = ({ item }) => (
    <View style={styles.gridRow}>
      <Text style={[styles.gridLabel, { color: '#FFFFFF' }]}>{item.label}</Text>
      <View style={styles.gridValueContainer}>
        {item.label === 'Description' ? (
          <ScrollView style={styles.descriptionContainer}>
            <Text style={[styles.description, { flex: 0, color: '#FFFFFF' }]} numberOfLines={0}>
              {item.value}
            </Text>
          </ScrollView>
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[styles.gridValue, { color: '#FFFFFF' }]}>{item.value}</Text>
            {item.withIcon && (
              <IconButton
                icon="map-marker"
                size={25}
                style={styles.iconButton}
                onPress={handleCardPress}
              />
            )}
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: '#141414' }]}>
      <TopAppBar title={event?.name} />

      <FlatList
        data={event.tickets}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
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
                    size={30}
                    style={styles.iconButton}
                    onPress={() => handleTicketCountChange('vip', -1)}
                  />
                  <Text style={styles.ticketCount}>{vipTicketCount}</Text>
                  <IconButton
                    icon="plus"
                    size={30}
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
                    size={30}
                    style={styles.iconButton}
                    onPress={() => handleTicketCountChange('general', -1)}
                  />
                  <Text style={styles.ticketCount}>{generalTicketCount}</Text>
                  <IconButton
                    icon="plus"
                    size={30}
                    style={styles.iconButton}
                    onPress={() => handleTicketCountChange('general', 1)}
                  />
                </View>
              </View>
              <View>
                <Text style={styles.total}>Total: €</Text>
              </View>
                <TouchableOpacity style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>Purchase Tickets</Text>
                </TouchableOpacity>
            </View>
          </>
        )}
      />
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
