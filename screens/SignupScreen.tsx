import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Credentials, createUser } from '../auth/authenticate';
import AuthContent from '../components/Auth/AuthContent';
import { RootStackParamList } from '../App';
import { useState } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { SIGNUP } from '../constants/screen';
import { ErrorOverlay } from '../components/ui/ErrorOverlay';

function SignupScreen({ navigation }: SignupScreenProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const signupHandler = async (credentials: Credentials) => {
    setIsLoading(true);
    createUser(credentials)
      .then(() => navigation.replace('Login'))
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
