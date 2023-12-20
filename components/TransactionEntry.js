import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const TransactionEntry = ({ item }) => {
    return (
      <View>
        <Text style={styles.text}>{item.id}</Text>
        {item.eventDetails.map((eventDetail) => (
          <View key={eventDetail.id}>
            <Text>{eventDetail.eventDetails?.name}</Text>
            {eventDetail.imageURL && (
              <Image
                source={{ uri: eventDetail.imageURL }}
                style={{ width: 100, height: 100 }}
              />
            )}
          </View>
        ))}
      </View>
    );
  };  

const styles = StyleSheet.create({
  text: {
    color: "#fff"
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default TransactionEntry;
