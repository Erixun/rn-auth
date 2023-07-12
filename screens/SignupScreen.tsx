import { createUser } from '../auth/authenticate';
import AuthContent from '../components/Auth/AuthContent';

function SignupScreen() {
  return <AuthContent onAuthenticate={createUser} />;
}

export default SignupScreen;
