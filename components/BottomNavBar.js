import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, MD3Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const BottomNavBar = ({ currentScreen }) => {
    const navigation = useNavigation();

    const getIconColor = (screenName) => {
        return currentScreen === screenName ? "#03DAC6" : '#FFFFFF';
    };

    return (
        <View style={styles.container}>
            <IconButton
                icon="home"
                iconColor={getIconColor('EventCatalog')}
                size={40}
                onPress={() => navigation.navigate('EventCatalog')}
            />

            <IconButton
                icon="wallet"
                iconColor={getIconColor('Wallet')}
                size={40}
                onPress={() => navigation.navigate('Wallet')}
            />

            <IconButton
                icon="account"
                iconColor={getIconColor('Profile')}
                size={40}
                onPress={() => navigation.navigate('Profile')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#3700B3",
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
});

export default BottomNavBar;
