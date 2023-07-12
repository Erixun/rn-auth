import { RootStackParamList } from '../App';

export const LOGIN = 'Login';
export const SIGNUP = 'Signup';
export const WELCOME = 'Welcome';

export const Screens: ScreenKeys = {
  LOGIN,
  SIGNUP,
  WELCOME,
};

export type ScreenKeys = { [x: string]: Screen };
export type Screen = keyof RootStackParamList;
