import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-paper';
import BottomNavBar from '../components/BottomNavBar';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { ScrollView } from 'react-native-gesture-handler';

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
          <Icon style={styles.icon} source="account" color="#fff" size={128} />
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
    backgroundColor: '#141414',
    alignItems: 'center',
    justifyContent: 'flex-start', 
  },
  icon: {
    position: 'absolute',
    top: 20,
    backgroundColor: '#253354',
  },
  centerContent: {
    width: '90%',
    marginTop: 40,
  },
  gridContainer: {
    marginBottom: 10,
    backgroundColor: '#253354',
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
    color: '#fff',
    paddingRight: 5,
    fontWeight: 'bold',
  },
  text: {
    color: '#fff',
  },
  bottomNavBarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  transactionHistoryText:{
    color: '#fff',
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
    borderBottomColor: '#253354',
    paddingVertical: 8,
  },
  transactionDate: {
    color: '#fff',
    flex: 1,
  },
  transactionDescription: {
    color: '#fff',
    flex: 2,
    paddingHorizontal: 15,
  },
  transactionAmount: {
    color: '#fff',
    flex: 1,
    textAlign: 'right',
    paddingHorizontal: 15,
  },
});

export default Profile;
