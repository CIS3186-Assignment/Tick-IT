import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const TransactionEntry = ({ item }) => {
  console.log('Rendering TransactionEntry for item: ', item);

  return (
    <View style={styles.entryContainer}>
      <Text style={styles.text}>{item.id}</Text>
      {item.eventDetails.map((eventDetail, index) => {
        console.log(`Rendering eventDetail ${index}: `, eventDetail);

        return (
          <View key={eventDetail.id} style={styles.detailContainer}>
            {eventDetail.imageURL ? (
              <Image
                source={{ uri: eventDetail.imageURL }}
                style={styles.image}
                onError={(error) => console.log('Error loading image: ', error)}
              />
            ) : (
              <Text style={styles.text}>No imageURL</Text>
            )}
            {eventDetail.name ? (
              <Text style={styles.text}>{eventDetail.name}</Text>
            ) : (
              <Text style={styles.text}>No name</Text>
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  entryContainer: {
    flexDirection: 'column', // Change to 'column'
    alignItems: 'center',
    marginBottom: 10,
  },
  detailContainer: {
    flexDirection: 'column', // Change to 'column'
    justifyContent: 'center',
    alignItems: 'center', 
    marginLeft: 10, 
  },
  text: {
    color: "#fff",
  },
  image: {
    width: 100,
    height: 100,
    marginLeft: 10, 
  },
});

export default TransactionEntry;