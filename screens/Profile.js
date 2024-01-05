import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { Icon, IconButton } from 'react-native-paper';
import BottomNavBar from '../components/BottomNavBar';
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { ScrollView } from 'react-native-gesture-handler';
import customTheme from '../theme';
import { getUserBookedEvents, fetchImagesForEvents } from '../services/ProfileService';
import TransactionEntry from "../components/TransactionEntry";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [bookedEvents, setBookedEvents] = useState([]);
  const navigation = useNavigation();

  const handleLogoutPress = () => {
    FIREBASE_AUTH.signOut()
      .then(() => {
        setUser(null);
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (authUser) => {
      if (authUser) {
        setUser(authUser);

        try {
          const events = await getUserBookedEvents("T08aFSTUuGoc5yUdh9Sy"); 
          const eventsWithImages = await fetchImagesForEvents(events);
          setBookedEvents(eventsWithImages);
        } catch (error) {
          console.error("Error fetching booked events:", error);
        }
      }
    });

    return unsubscribe;
  }, []);

  return (

    <View style={styles.container}>
      <View style={styles.centerContent}>
      <View style={styles.logoutContainer}>
        <IconButton
          icon="logout"
          size={40}
          iconColor={customTheme.colors.onPrimary}
          onPress={handleLogoutPress}
        />
        <Text style={styles.logoutText} onPress={handleLogoutPress} >Logout</Text>
      </View>
        <View style={styles.gridContainer}>
          <Icon style={styles.icon} source="account" color={customTheme.colors.onPrimary} size={128} />
          <View style={styles.gridItem}>
            <Text style={styles.text}>{user?.displayName}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.text}>{user?.email}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.transactionHistoryText}>Transaction History:</Text>
          <FlatList
            data={bookedEvents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TransactionEntry item={item} />}
          />
        </View>
      </View>
      <View style={styles.bottomNavBarContainer}>
        <BottomNavBar currentScreen="Profile" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customTheme.colors.background,
    alignItems: 'center',
    justifyContent: 'flex-start', 
  },
  icon: {
    position: 'absolute',
    top: 20,
    backgroundColor: customTheme.colors.primary,
  },
  centerContent: {
    width: '90%',
    marginTop: 40,
  },
  gridContainer: {
    marginBottom: 10,
    backgroundColor: customTheme.colors.tertiary,
    padding: 20,
    alignItems: 'center',
    borderRadius: 30,
  },
  gridItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    color: customTheme.colors.onPrimary,
    paddingRight: 5,
    fontWeight: 'bold',
  },
  text: {
    color: customTheme.colors.onPrimary,
  },
  bottomNavBarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  transactionHistoryText:{
    color: customTheme.colors.onPrimary,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: customTheme.colors.primary,
    paddingVertical: 8,
  },
  transactionDate: {
    color: customTheme.colors.onPrimary,
    flex: 1,
  },
  transactionDescription: {
    color: customTheme.colors.onPrimary,
    flex: 2,
    paddingHorizontal: 15,
  },
  transactionAmount: {
    color: customTheme.colors.onPrimary,
    flex: 1,
    textAlign: 'right',
    paddingHorizontal: 15,
  },
  logoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    right: 10,
    color: customTheme.colors.onPrimary,
  },
});

export default Profile;