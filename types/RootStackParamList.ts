import { LOGIN, SIGNUP, WELCOME } from '../constants/screens';

export type RootStackParamList = {
  [LOGIN]: undefined;
  [SIGNUP]: undefined;
  [WELCOME]: undefined;
};

export type NavStackParamList = {
  'Auth': undefined,
  'Authenticated': undefined 
}

export type AuthStackParamList = {
  [LOGIN]: undefined;
  [SIGNUP]: undefined;
}

export type AuthenticatedStackParamList = {
  [WELCOME]: undefined;
}
