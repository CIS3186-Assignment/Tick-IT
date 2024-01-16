import React from 'react';
import { View, StyleSheet, Linking, Image } from 'react-native';
import { Text, Button, IconButton } from "react-native-paper";
import TopAppBar from '../components/TopAppBar';
import customTheme from '../theme';

const EventCreator = ({ route }) => {
  const { creator } = route.params;

  const callPhone = async () => {
    url = "tel://" + creator.phone
    Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    })
  .catch((err) => console.error('An error occurred', err));
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
          style={{position: 'absolute', top: 20, right: 20, backgroundColor: customTheme.colors.tertiary}}
          iconColor={customTheme.colors.onTertiary}
          icon="account-supervisor-circle"
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
            accessibilityLabel={`Call ${creator.name}`}
            accessibilityRole="button"
            accessibilityState={{ disabled: false }}
          >
            Call
          </Button>
          <Button
            mode="contained"
            icon="email"
            onPress={openEmail}
            style={styles.button}
            accessibilityLabel={`Send an Email to ${creator.name}`}
            accessibilityRole="button"
            accessibilityState={{ disabled: false }}
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
    backgroundColor: customTheme.colors.background,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeImage: {
    width: '80%',
    height: '50%',
    borderRadius: 10,
    backgroundColor: customTheme.colors.tertiary,
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
    color: customTheme.colors.onTertiary,
    fontWeight: 'bold',
  },
  text: {
    color: customTheme.colors.onTertiary,
  },
  buttonContainer: {
    marginVertical: 16,
    marginHorizontal: 20,
    bottom: 20,
  },
  button: {
    backgroundColor: customTheme.colors.tertiary,
    marginTop: 8,
    width: 200,
  },
  textAd: {
    color: customTheme.colors.onTertiary,
    width: '60%',
    textAlign: 'right',
  },
});

export default EventCreator;
