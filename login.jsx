import { StyleSheet, Text, View ,Button} from 'react-native';
import {GoogleSignin, GoogleSigninButton, statusCodes} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: '192522835612-oa6pic472tc625o56cbunvk2gjgbejl1.apps.googleusercontent.com',
    offlineAccess: true
});

export default Login = ()=>{

    const signInWithGoogleAsync = async () => {
        try{

            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo)
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              // User cancelled the sign-in process
              console.log('Google Sign-In Cancelled');
            } else if (error.code === statusCodes.IN_PROGRESS) {
              // Operation (e.g., sign-in) is in progress already
              console.log('Google Sign-In In Progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              // Play services not available or outdated on the device
              console.log('Google Play Services Not Available');
            } else {
              // Some other error occurred
              console.error('Google Sign-In Error', error);
            }

        };
    }

    return (
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signInWithGoogleAsync}
      />
    );
}