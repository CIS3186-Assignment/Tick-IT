import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, HelperText, Button } from 'react-native-paper';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const emailHasErrors = () => {
        const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        return !pattern.test(email)
    }

    const passwordHasErrors = () => {
        // TODO
    }

    const signIn = async () => {
        try {
            setLoading(true);
            await signInWithEmailAndPassword(FIREBASE_AUTH, email, password).then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    
    const signUp = async () => {
        try {
            setLoading(true);
            await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password).then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={{ flex: 1, position: 'relative', backgroundColor: '#141414' }}>
            <View style={{ flex: 1 }}>
                <TextInput label="Email" value={email} onChangeText={setEmail} />
                <TextInput label="Password" secureTextEntry={true} value={password} onChangeText={setPassword} />
                <>
                    <Button onPress={signIn} textColor='#fff'>Sign In</Button>
                    <Button onPress={signUp} textColor='#fff'>Sign Up </Button>

                </>
            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    test: {
        color: '#fff',
        textAlign: 'center',
        marginTop: '100%'
    }
});

