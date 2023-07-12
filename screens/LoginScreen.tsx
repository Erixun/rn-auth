import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Credentials, signIn } from '../auth/authenticate';
import AuthContent from '../components/Auth/AuthContent';
import { RootStackParamList } from '../App';
type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};
function LoginScreen({ navigation }: LoginScreenProps) {
  const authHandler = async (credentials: Credentials) => {
    signIn(credentials).then(() => navigation.replace('Welcome')).catch((error) => {
      console.log('Error signing in', error);
    });

    navigation.replace('Welcome');
  };
  return <AuthContent isLogin onAuthenticate={authHandler} />;
}

export default LoginScreen;
