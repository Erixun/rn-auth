import { Stack } from '../constants/Stack';
import { WELCOME } from '../constants/screens';
import { Colors } from '../constants/styles';
import WelcomeScreen from '../screens/WelcomeScreen';

export function AuthenticatedNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen name={WELCOME} component={WelcomeScreen} />
    </Stack.Navigator>
  );
}
