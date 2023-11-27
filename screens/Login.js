import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

export default Login;