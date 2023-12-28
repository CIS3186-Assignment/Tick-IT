// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { signInWithEmailAndPassword, AuthError } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false)

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
        <KeyboardAwareScrollView
            style={{ flex: 0, backgroundColor: '#141414' }}
            contentContainerStyle={{ flex: 1 }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../assets/logo.png')}style={styles.Image}/>
                <Text style={styles.login}>Log In</Text>
                <TextInput label="Email" value={email} onChangeText={setEmail} style={styles.inputs} />
                <TextInput 
                label="Password" 
                secureTextEntry={!showPassword} 
                value={password} 
                onChangeText={setPassword} 
                style={styles.inputs} 
                right={<TextInput.Icon icon={showPassword ? "eye" : "eye-off"} onPress = {() => setShowPassword(!showPassword)}/>}
                />
                    {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
                <Button onPress={signIn} textColor='#fff' style={styles.signIn}>
                    <Text style={styles.signInText}>Sign In</Text>
                </Button>
                <Button onPress={() => navigation.navigate('Register')} textColor='#fff'>
                    <Text style={styles.noAccount}>No account? Sign Up</Text>
                </Button>
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
    inputs: {
        height: 70,
        width: '80%',  
        marginHorizontal: '10%',  
        marginVertical: 15,
        borderRadius: 20,
        borderTopStartRadius: 20,
        borderTopRightRadius: 20,
    },
    signIn: {
        backgroundColor: '#253354',
        marginHorizontal: '10%',  
        marginTop: 20, 
        paddingVertical: 10, 
        width: 180, 
        borderRadius: 30, 
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    signInText: {
        color: '#fff', 
        fontSize: 20, 
        fontWeight: 'bold',
    },
    noAccount: {
        color: '#fff', 
        fontSize: 15, 
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textDecorationColor: '#fff',
        marginTop: 20,
        justifyContent: 'center', 
        alignItems: 'center', 
        },

    login:{
        color: '#fff',
        fontSize: 25,
        alignContent: 'center',
        paddingHorizontal: '25%',
        marginBottom: 10
    },
});

export default Login;
