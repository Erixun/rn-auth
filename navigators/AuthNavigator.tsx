import { Stack } from '../constants/Stack';
import { LOGIN, SIGNUP } from '../constants/screens';
import { Colors } from '../constants/styles';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

export function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen name={LOGIN} component={LoginScreen} />
      <Stack.Screen name={SIGNUP} component={SignupScreen} />
    </Stack.Navigator>
  );
}
