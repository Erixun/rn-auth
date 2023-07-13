import {
  AuthStackParamList,
  AuthenticatedStackParamList,
  RootStackParamList,
} from './RootStackParamList';

export type Screen =
  | keyof RootStackParamList
  | keyof AuthStackParamList
  | keyof AuthenticatedStackParamList;
export type RootScreen = keyof RootStackParamList;
export type AuthScreen = keyof AuthStackParamList;
export type AuthenticatedScreen = keyof AuthenticatedStackParamList;
