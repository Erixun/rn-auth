import axios from 'axios';
import { API_KEY } from '../config/keys';

export const createUser = async (credentials: Credentials) => {
  return authenticate('signUp', credentials);
};

export const signIn = async (credentials: Credentials) => {
  return authenticate('signInWithPassword', credentials);
};

const authenticate = async (mode: AuthMode, credentials: Credentials) => {
  const response = await axios
    .post(
      `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`,
      {
        ...credentials,
        returnSecureToken: true,
      }
    )
    .then((response) => {
      console.log(response);
    });
};

export type AuthMode = 'signUp' | 'signInWithPassword';
export type Credentials = {
  email: string;
  password: string;
};