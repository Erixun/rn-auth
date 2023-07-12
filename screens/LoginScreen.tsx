import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Credentials, signIn } from '../auth/authenticate';
import AuthContent from '../components/Auth/AuthContent';
import { RootStackParamList } from '../App';
import { useState } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';

function LoginScreen({ navigation }: LoginScreenProps) {
  const [isLoading, setIsLoading] = useState(false);
  const authHandler = async (credentials: Credentials) => {
    setIsLoading(true);
    signIn(credentials)
      .then(() => navigation.replace('Welcome'))
      .catch((error) => {
        console.log('Error signing in', error);
      })
      .finally(() => setIsLoading(false));

    navigation.replace('Welcome');
  };

  if (isLoading) return <LoadingOverlay message={'Signing you in...'} />;

  return <AuthContent isLogin onAuthenticate={authHandler} />;
}

export default LoginScreen;

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};
