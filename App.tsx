import { StatusBar } from 'expo-status-bar';
import { AuthContext, AuthContextProvider } from './store/authContext';
import { Navigation } from './navigators/Navigation';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useContext, useCallback } from 'react';
import { TOKEN_KEY } from './config/keys';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export const Root = () => {
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);

  useEffect(() => {
    checkStorage().then(setHasCheckedStorage);
  }, []);

  const authCtx = useContext(AuthContext);

  const checkStorage = async () => {
    await AsyncStorage.getItem(TOKEN_KEY)
      .then(authCtx.authenticate)
      .catch((error) => console.log(error));

    return true;
  };

  const onLayoutRootView = useCallback(async () => {
    if (hasCheckedStorage) await SplashScreen.hideAsync();
  }, [hasCheckedStorage]);

    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
    </View>
  return (
      <Navigation />
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />

      <AuthContextProvider>
        <Navigation />
        {/* <Root /> */}
      </AuthContextProvider>
    </>
  );
}
