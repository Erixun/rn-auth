import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ReactNode,
  createContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { View } from 'react-native';
import { KEY_TOKEN, KEY_TOKEN_REFRESH } from '../config/keys';
import * as SplashScreen from 'expo-splash-screen';

const defaultConfig = {
  token: '',
  refreshToken: '',
  isAuthenticated: false,
  authenticate: (token: string, refreshToken?: string) => {}, // method for changing the state
  logout: () => {}, // erases token
};

export type AuthConfig = typeof defaultConfig;

export const AuthContext = createContext<AuthConfig>(defaultConfig);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authToken, setAuthToken] = useState<string | undefined>();
  const [refreshToken, setRefreshToken] = useState<string | undefined>(
    undefined
  );
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);

  useEffect(() => {
    checkStorage().then(setHasCheckedStorage);
  }, []);

  const checkStorage = async () => {
    const token = 'yJhbGciOiJSUzI1NiIsImtpZCI6ImNmM2I1YWRhM2NhMzkxNTQ4ZDM1OTJiMzU5MjkyM2UzNjAxMmI5MTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVhY3QtbmF0aXZlLWNvdXJzZS1kZWZlOSIsImF1ZCI6InJlYWN0LW5hdGl2ZS1jb3Vyc2UtZGVmZTkiLCJhdXRoX3RpbWUiOjE2OTEyNDk4MTIsInVzZXJfaWQiOiJqTzREZllJUFRQWFZyeGhadmRmUURkUGF3bkczIiwic3ViIjoiak80RGZZSVBUUFhWcnhoWnZkZlFEZFBhd25HMyIsImlhdCI6MTY5MTI0OTgxMiwiZXhwIjoxNjkxMjUzNDEyLCJlbWFpbCI6ImVyaWtAZXJpay5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiZXJpa0BlcmlrLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.HV7hmK-2kGy9YhGzwT7HopQAb95FQselbRB5SzSFVTZBnUJLSafaZk6Q01JMsQIdMA8d072QYb6OY4FjnsKNBpybu3wuvBBg9Gya_Ozd30N1t9bTwkfEkqKJ1qX3QMWdiRg6LJNNEC9rGZp5TZSEmU8wA4W73dE6PelKReB3i5glTeCtWhnHI_hzvlKGIFzeB7w5Yjgc4eCUnI6dWEXqMbLIlUkdf6rIPN9VnM7vx7QwFKPBwV8jiYaqZ1M_n5Pyv4cC1WEsLD28qZiwgJmWFmvWIAi7b5_gPKWPZ7Zs_gSoCjFxXxupsDKH-49HQfonmCSl7nPS3u1XfolYk7IHBw'//await AsyncStorage.getItem(KEY_TOKEN);
    const refreshToken = await AsyncStorage.getItem(KEY_TOKEN_REFRESH);

    await authenticate(token, refreshToken).catch(console.error);

    return true;
  };

  const authenticate = async (token?: string, refreshToken?: string) => {
    if (!token) throw new Error('No token provided');

    setAuthToken(token);
    AsyncStorage.setItem(KEY_TOKEN, token);

    if (refreshToken) {
      setRefreshToken(refreshToken);
      AsyncStorage.setItem(KEY_TOKEN_REFRESH, refreshToken);
    }
  };

  const logout = () => {
    setAuthToken(undefined);
    AsyncStorage.removeItem(KEY_TOKEN);
  };

  const value: AuthConfig = {
    token: authToken,
    refreshToken,
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
