// SignUpScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { createUserWithEmailAndPassword,updateProfile } from 'firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const signUp = async () => {
        try {
            // Attempt to sign up
            const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
            const user = userCredential.user;
            await updateProfile(user, { displayName: name });
            console.log(user);
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
        <KeyboardAwareScrollView
            style={{ flex: 0, backgroundColor: '#141414' }}
            contentContainerStyle={{ flex: 1 }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                
                <Image source={require('../assets/logo.png')}style={styles.Image}/>
                <Text style={styles.register}>Register</Text>
                <TextInput label="Name" value={name} onChangeText={setName} style={styles.input}/>
                <TextInput label="Email" value={email} onChangeText={setEmail} style={styles.input}/>
                <TextInput label="Password" secureTextEntry={true} value={password} onChangeText={setPassword} style={styles.input}/>
                    {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
                <Button onPress={signUp} textColor='#fff' style={styles.signUp}>Sign Up</Button>    
            </View>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        marginTop: 10,
        paddingHorizontal: 20,
        textAlign: 'center',
    },
    Image: {
        alignSelf: 'center', 
        width: 400, 
        height: 200,
        borderRadius: 50, 
        marginBottom: 50
    },
    input: {
        height: 70,
        width: '80%',  
        marginHorizontal: '10%',  
        marginVertical: 15,
        borderRadius: 20,
        borderTopStartRadius: 20,
        borderTopRightRadius: 20,
    },
    register:{
        color: '#fff',
        fontSize: 25,
        alignContent: 'center',
        paddingHorizontal: '25%',
        marginBottom: 10
    },
    signUp: {
        backgroundColor: '#253354',
        marginHorizontal: '10%',  
        marginTop: 20, 
        paddingVertical: 10, 
        paddingHorizontal: 20,
        borderRadius: 30, 
        justifyContent: 'center', 
        alignItems: 'center',  
    }
});

export default Register;
