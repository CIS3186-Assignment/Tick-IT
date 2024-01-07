import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { signInWithEmailAndPassword, AuthError } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import customTheme from '../theme';

const Login = ({route}) => {


    const required = route.params?.required ?? false;
    console.log("rendering Login with required:", required);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false)

    const navigation = useNavigation();

    useEffect(() => {
        if (FIREBASE_AUTH.currentUser) {
            console.log("Already logged in, redirecting to EventCatalog");
            navigation.navigate("EventCatalog");
        }

        const unsubscribe = FIREBASE_AUTH.onAuthStateChanged(user => {
            if (user) {
                // User is signed in.
                console.log("Already logged in, redirecting to EventCatalog");
                navigation.navigate("EventCatalog");
            } else {
                // No user is signed in.
                console.log("Not logged in");
            }
        });
    
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const signIn = async () => {
        try {
            // Attempt to sign in
            const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
            const user = userCredential.user;
            console.log(user);
            if (!required)
                navigation.navigate("EventCatalog")
            else
                navigation.goBack();
            setErrorMessage(null);
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
            style={{ flex: 0, backgroundColor: customTheme.colors.background }}
            contentContainerStyle={{ flex: 1 }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../assets/logo.png')}style={styles.Image} accessibilityLabel="Tick-IT"/>
                <Text style={styles.login}>Log In</Text>
                <TextInput 
                    theme={{ colors: { primary: customTheme.colors.background } }}
                    label="Email" 
                    value={email} 
                    onChangeText={setEmail} 
                    style={styles.inputs} 
                    accessibilityLabel="Enter email" 
                    />

                    <TextInput 
                    theme={{ colors: { primary: customTheme.colors.background } }}
                    accessibilityLabel="Enter password"
                    label="Password" 
                    secureTextEntry={!showPassword} 
                    value={password} 
                    onChangeText={setPassword} 
                    style={styles.inputs} 
                    right={<TextInput.Icon icon={showPassword ? "eye" : "eye-off"} onPress = {() => setShowPassword(!showPassword)}/>}
                    />
                    {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
                <Button onPress={signIn} style={styles.signIn} accessibilityLabel="Sign In">
                    <Text style={styles.signInText}>Sign In</Text>
                </Button>
                <Button onPress={() => navigation.navigate('Register')} accessibilityLabel="Register">
                    <Text style={styles.noAccount}>No account? Sign Up</Text>
                </Button>
                {!required && (
                    <Button onPress={() => navigation.navigate("EventCatalog")} accessibilityLabel="Continue without logging in">
                        <Text style={styles.noAccount}>Continue without logging in</Text>
                    </Button>
                )}
            </View>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    errorText: {
        color: customTheme.colors.error,
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
        backgroundColor: customTheme.colors.primary,
        marginHorizontal: '10%',  
        marginTop: 20, 
        paddingVertical: 10, 
        width: 180, 
        borderRadius: 30, 
        justifyContent: 'center', 
        alignItems: 'center', 
        textColor: customTheme.colors.onPrimary,
    },
    signInText: {
        color: customTheme.colors.onPrimary, 
        fontSize: 20, 
        fontWeight: 'bold',
    },
    noAccount: {
        color: customTheme.colors.onPrimary, 
        fontSize: 15, 
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textDecorationColor: customTheme.colors.onPrimary,
        marginTop: 20,
        justifyContent: 'center', 
        alignItems: 'center', 
        },

    login:{
        color: customTheme.colors.onPrimary,
        fontSize: 25,
        alignContent: 'center',
        paddingHorizontal: '25%',
        marginBottom: 10
    },
});

export default Login;
