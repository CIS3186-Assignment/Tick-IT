import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailHasErrors = () => {
        const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        return !pattern.test(email)
    }

    const passwordHasErrors = () => {
        // TODO
    }

    return (
        <View style={{ flex: 1, position: 'relative', backgroundColor: '#141414'}}>
        <View style={{ flex: 1 }}>
            <TextInput label="Email" value={email} onChangeText={setEmail} />
            <HelperText type="error" visible={emailHasErrors()}>
                Email address is invalid!
            </HelperText>
            <TextInput label="Password" value={password} onChangeText={setPassword} />
            <HelperText type="error" visible={passwordHasErrors()}>
                Password is invalid!
            </HelperText>
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

export default Register;