import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Credentials, createUser } from '../auth/authenticate';
import AuthContent from '../components/Auth/AuthContent';
import { useState, useContext } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { SIGNUP } from '../constants/screens';
import { ErrorOverlay } from '../components/ui/ErrorOverlay';
import { AuthContext } from '../store/authContext';
import { RootStackParamList } from '../types/RootStackParamList';

function SignupScreen({ navigation }: SignupScreenProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const authCtx = useContext(AuthContext);

  const signupHandler = async (credentials: Credentials) => {
    setIsLoading(true);
    createUser(credentials)
      .then(({ idToken }) => {
        authCtx.authenticate(idToken);
        navigation.replace('Login');
      })
      .catch((error) => {
        console.log('Error signing up', error);
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  if (isLoading) return <LoadingOverlay message={'Creating user profile...'} />;

  if (error) return <ErrorOverlay message={error} screen={SIGNUP} />;

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;

type SignupScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, typeof SIGNUP>;
};
