import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ReactNode,
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback,
} from 'react';
import { ActivityIndicator, View } from 'react-native';
import { TOKEN_KEY } from '../config/keys';
import * as SplashScreen from 'expo-splash-screen';

const defaultConfig = {
  token: '',
  // refreshToken: '',
  isAuthenticated: false,
  authenticate: (token: string) => {}, // method for changing the state
  logout: () => {}, // erases token
};

export type AuthConfig = typeof defaultConfig;

export const AuthContext = createContext<AuthConfig>(defaultConfig);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authToken, setAuthToken] = useState<string | undefined>();
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);

  useEffect(() => {
    checkStorage().then(setHasCheckedStorage);
  }, []);

  const checkStorage = async () => {
    await AsyncStorage.getItem(TOKEN_KEY)
      .then(authenticate)
      .catch((error) => console.log(error));

    return true;
  };

  const authenticate = (token?: string) => {
    if (token) {
      setAuthToken(token);
      AsyncStorage.setItem(TOKEN_KEY, token);
    }
  };
  
  const logout = () => {
    setAuthToken(undefined);
    AsyncStorage.removeItem(TOKEN_KEY);
  };
  
  const value: AuthConfig = {
    token: authToken,
    isAuthenticated: Boolean(authToken),
    authenticate,
    logout,
  };

  const onLayoutRootView = useCallback(async () => {
    if (hasCheckedStorage) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await SplashScreen.hideAsync();
    }
  }, [hasCheckedStorage]);

  return (
    <AuthContext.Provider value={value}>
      <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
        {children}
      </View>
    </AuthContext.Provider>
  );
};
