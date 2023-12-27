import React from 'react';
import { View, StyleSheet, Linking, Image } from 'react-native';
import { Text, Button, IconButton, MD3Colors } from "react-native-paper";
import TopAppBar from '../components/TopAppBar';

const EventCreator = ({ route }) => {
  const { creator } = route.params;

  const callPhone = async () => {
    try {
      const canOpen = await Linking.canOpenURL("tel:" + creator.phone);
      if (canOpen) {
        await Linking.openURL("tel:" + creator.phone);
      } else {
        console.error("Cannot open phone app.");
      }
    } catch (error) {
      console.error("Error opening phone app:", error);
    }
  };

  const openEmail = async () => {
    try {
      const canOpen = await Linking.canOpenURL("mailto:" + creator.email);
      if (canOpen) {
        await Linking.openURL("mailto:" + creator.email);
      } else {
        console.error("Cannot open email app.");
      }
    } catch (error) {
      console.error("Error opening email app:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TopAppBar title={creator.name} />
      <View style={styles.centerContent}>
        <Image
          style={styles.largeImage}
          resizeMode="cover"
        />
        <IconButton
            style={{position: 'absolute', top: 20, right: 20, backgroundColor: '#253354'}}
            iconColor={MD3Colors.error100}
            icon="account-supervisor-circle"
            color="#FFFFFF"
            size={50}
          />
        <View style={styles.gridContainer}>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.text}>{creator.name}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.textAd}>{creator.address}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Phone Number:</Text>
            <Text style={styles.text}>{creator.phone}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Email Address:</Text>
            <Text style={styles.text}>{creator.email}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            icon="phone"
            onPress={callPhone}
            style={styles.button}
          >
            Call
          </Button>
          <Button
            mode="contained"
            icon="email"
            onPress={openEmail}
            style={styles.button}
          >
            Send an Email
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeImage: {
    width: '80%',
    height: '50%',
    borderRadius: 10,
    backgroundColor: '#253354',
    margin: 20,
  },
  gridContainer: {
    width: '80%',
    marginTop: 20,
    marginBottom: 10,
  },
  gridItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    color: '#fff',
    fontWeight: 'bold',
  },
  text: {
    color: '#fff',
  },
  buttonContainer: {
    marginVertical: 16,
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: '#253354',
    marginTop: 8,
    width: 200,
  },
  textAd: {
    color: '#fff',
    width: '60%',
    textAlign: 'right',
  },
});

export default EventCreator;
