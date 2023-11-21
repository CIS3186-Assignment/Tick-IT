import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, MD3Colors } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const BottomNavBar = ({ currentScreen }) => {
    const navigation = useNavigation();
    const {bottom} = useSafeAreaInsets;

    const getIconColor = (screenName) => {
        return currentScreen === screenName ? "#5581b9" : '#FFFFFF';
    };

    return (
        <Appbar style={styles.container} safeAreaInsets={{bottom}}>
            <Appbar.Action
                icon="home"
                iconColor={getIconColor('EventCatalog')}
                size={40}
                onPress={() => navigation.navigate('EventCatalog')}
            />

            <Appbar.Action
                icon="wallet"
                iconColor={getIconColor('Wallet')}
                size={40}
                onPress={() => navigation.navigate('Wallet')}
            />

            <Appbar.Action
                icon="account"
                iconColor={getIconColor('Profile')}
                size={40}
                onPress={() => navigation.navigate('Profile')}
            />
        </Appbar>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        backgroundColor: "#253354",
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        left: 0, 
        right: 0,
        top: 0,
        bottom: 0
    },
});

export default BottomNavBar;
