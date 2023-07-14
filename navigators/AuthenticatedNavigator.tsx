import { useContext } from 'react';
import IconButton from '../components/ui/IconButton';
import { Stack } from '../constants/Stack';
import { WELCOME } from '../constants/screens';
import { Colors } from '../constants/styles';
import WelcomeScreen from '../screens/WelcomeScreen';
import { AuthContext } from '../store/authContext';

export function AuthenticatedNavigator() {
  const { logout } = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        headerRight: (props) => {
          return (
            <IconButton
              icon="log-out-outline"
              size={20}
              onPress={logout}
              color={'white'}
            />
          );
        },
      }}
    >
      <Stack.Screen name={WELCOME} component={WelcomeScreen} />
    </Stack.Navigator>
  );
}
