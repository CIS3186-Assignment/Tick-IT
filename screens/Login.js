// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { signInWithEmailAndPassword, AuthError } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigation = useNavigation();

    const signIn = async () => {
        try {
            // Attempt to sign in
            const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
            const user = userCredential.user;
            console.log(user);
            navigation.navigate("EventCatalog")
        } catch (error) {
            // Handle different authentication errors
            switch (error.code) {
                case 'auth/invalid-login-credentials':
                    setErrorMessage('Wrong Credentials: The email address and password do not match.');
                    break;
                default:
                    console.log(error.code);
                    setErrorMessage('Authentication Failed: An unexpected error occurred.');
            }
        }
    };

    return (
        <View style={{ flex: 1, position: 'relative', backgroundColor: '#141414' }}>
            <View style={{ flex: 1 }}>
                <TextInput label="Email" value={email} onChangeText={setEmail} />
                <TextInput label="Password" secureTextEntry={true} value={password} onChangeText={setPassword} />
                {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
                <Button onPress={signIn} textColor='#fff'>Sign In</Button>
                <Button onPress={() => navigation.navigate('Register')} textColor='#fff'>No account? Sign Up</Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        marginTop: 10,
        marginBottom: 10,
    },
});

export default Login;
