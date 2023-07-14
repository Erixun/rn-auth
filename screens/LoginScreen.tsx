import { Credentials, signIn } from '../auth/authenticate';
import AuthContent from '../components/Auth/AuthContent';
import { useContext, useState } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { ErrorOverlay } from '../components/ui/ErrorOverlay';
import { LOGIN } from '../constants/screens';
import { AuthContext } from '../store/authContext';

function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const authCtx = useContext(AuthContext);
  const authHandler = async (credentials: Credentials) => {
    setIsLoading(true);
    signIn(credentials)
      .then(({ idToken }) => {
        authCtx.authenticate(idToken);
      })
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
