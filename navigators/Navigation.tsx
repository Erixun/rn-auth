import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import { AuthContext } from '../store/authContext';
import { AuthenticatedNavigator } from './AuthenticatedNavigator';
import { AuthNavigator } from './AuthNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavStackParamList } from '../types/RootStackParamList';
import { Colors } from '../constants/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NavStack = createNativeStackNavigator<NavStackParamList>();

export function Navigation() {
  const authCtx = useContext(AuthContext);
  
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: Colors.primary100,
          primary: Colors.primary800,
        },
      }}
    >
      <NavStack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: Colors.primary100 },
          headerShown: false,
        }}
      >
        {authCtx.isAuthenticated ? (
          <NavStack.Screen
            name={'Authenticated'}
            component={AuthenticatedNavigator}
          />
        ) : (
          <NavStack.Screen name={'Auth'} component={AuthNavigator} />
        )}
      </NavStack.Navigator>
    </NavigationContainer>
  );
}
