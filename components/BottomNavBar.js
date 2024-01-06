import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import customTheme from '../theme';

const BottomNavBar = ({ currentScreen }) => {
    const navigation = useNavigation();
    const {bottom} = useSafeAreaInsets;

    const getIconColor = (screenName) => {
        return currentScreen === screenName ? customTheme.colors.primary : customTheme.colors.onPrimary;
    };

    return (
        <Appbar style={styles.container} safeAreaInsets={{bottom}}>
            <Appbar.Action
                accessibilityLabel="Navigate to Event Catalog"
                icon="home"
                iconColor={getIconColor('EventCatalog')}
                size={40}
                onPress={() => navigation.navigate('EventCatalog')}
                focusable={true}
                tabIndex={1}
            />

            <Appbar.Action
                accessibilityLabel="Navigate to Wallet"
                icon="wallet"
                iconColor={getIconColor('Wallet')}
                size={40}
                onPress={() => navigation.navigate('Wallet')}
                focusable={true}
                tabIndex={2}
            />

            <Appbar.Action
                accessibilityLabel="Navigate to Profile"
                icon="account"
                iconColor={getIconColor('Profile')}
                size={40}
                onPress={() => navigation.navigate('Profile')}
                focusable={true}
                tabIndex={3}
            />
        </Appbar>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        backgroundColor: customTheme.colors.tertiary,
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
