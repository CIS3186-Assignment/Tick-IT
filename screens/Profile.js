import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-paper';
import BottomNavBar from '../components/BottomNavBar';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { ScrollView } from 'react-native-gesture-handler';
import customTheme from '../theme';

const Profile = () => {
  const [user, setUser] = useState(null);
  const transactions = [
    { date: '2023-01-01', description: 'Reload: The Classics', amount: 50},
    { date: '2023-01-05', description: 'Chill & Grill', amount: 15.0 },
    { date: '2023-01-10', description: 'ICTSA Ball', amount: 40.0 },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
      if (authUser) {
        setUser(authUser);
      }
    });

    return () => unsubscribe();
  }, []);

  return (

    <View style={styles.container}>
      <View style={styles.centerContent}>
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
          <ScrollView>
            {transactions.map((transaction, index) => (
              <View key={index} style={styles.transactionItem}>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
                <Text style={styles.transactionDescription}>{transaction.description}</Text>
                <Text style={styles.transactionAmount}>€{transaction.amount}</Text>
              </View>
            ))}
          </ScrollView>
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
});

export default Profile;
