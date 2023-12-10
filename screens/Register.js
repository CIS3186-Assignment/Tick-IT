// SignUpScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { createUserWithEmailAndPassword,updateProfile } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const navigation = useNavigation();

    const signUp = async () => {
        try {
            // Attempt to sign up
            const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
            const user = userCredential.user;
            await updateProfile(user, { displayName: name });
            console.log(user);
            navigation.navigate("Login")
        } catch (error) {
            // Handle different authentication errors
            switch (error.code) {
                case 'auth/invalid-email':
                    setErrorMessage('Invalid Email: The email address is not valid.');
                    break;
                case 'auth/email-already-in-use':
                    setErrorMessage('Email Already in Use: The email address is already associated with another account.');
                    break;
                case 'auth/weak-password':
                    setErrorMessage('Weak Password: The password must be at least 6 characters long.');
                    break;
                default:
                    console.log(error);
                    setErrorMessage('Sign Up Failed: An unexpected error occurred.');
            }
        }
    };

    return (
        <View style={{ flex: 1, position: 'relative', backgroundColor: '#141414' }}>
            <View style={{ flex: 1 }}>
                <TextInput label="Name" value={name} onChangeText={setName} />
                <TextInput label="Email" value={email} onChangeText={setEmail} />
                <TextInput label="Password" secureTextEntry={true} value={password} onChangeText={setPassword} />
                {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
                <Button onPress={signUp} textColor='#fff'>Sign Up</Button>
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
    // ... your other styles
});

export default Register;
