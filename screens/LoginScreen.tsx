import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Credentials, signIn } from '../auth/authenticate';
import AuthContent from '../components/Auth/AuthContent';
import { RootStackParamList } from '../App';
import { useState } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { ErrorOverlay } from '../components/ui/ErrorOverlay';
import { LOGIN } from '../constants/screen';

function LoginScreen({ navigation }: LoginScreenProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(''); // TODO: [E] Add error handling [E
  const authHandler = async (credentials: Credentials) => {
    setIsLoading(true);
    signIn(credentials)
      .then(() => navigation.replace('Welcome'))
      .catch((error) => {
        console.log('Error signing in', error);
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  if (isLoading) return <LoadingOverlay message={'Signing you in...'} />;

  if (error) return <ErrorOverlay message={error} screen={LOGIN} />;

  return <AuthContent isLogin onAuthenticate={authHandler} />;
}

export default LoginScreen;

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, typeof LOGIN>;
};
