import React from 'react';
import { View, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import BottomNavBar from '../components/BottomNavBar';
import { STORAGE } from '../FirebaseConfig.js';
import WalletCard from '../components/WalletCard.js';
import { getCategories } from '../services/CategoriesService.js';
import sampleEvents from '../sample_data/events';


const Wallet = () => {
  const [value, setValue] = React.useState('');
  return (
    <View style={{ ...styles.container, backgroundColor: "#141414" }}>
      <View>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          style={styles.segmentedButtons}
          buttons={[
            {
              value: 'upcoming',
              label: 'Upcoming',
            },
            {
              value: 'past',
              label: 'Past',
            },
          ]}
        />
      </View>
      <FlatList
        data={sampleEvents.events}
        keyExtractor={(item) => item.id}
        style={styles.eventCard}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <WalletCard event={item} imageURL={item.image} />
        )}
      />      
      <BottomNavBar currentScreen="Wallet" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  segmentedButtons: {
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

export default Wallet;
