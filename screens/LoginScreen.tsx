import AuthContent from '../components/Auth/AuthContent';

function LoginScreen() {
  const authHandler = () => {
    // Todo
    console.log('Login attempt')
  };
  return <AuthContent isLogin onAuthenticate={authHandler} />;
}

export default LoginScreen;
