import axios from 'axios';
import { API_KEY } from '../config/keys';

const createUser = async (email: string, password: string) => {
  // const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
  const response = await axios
    .post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    )
    .then((response) => {
      console.log(response);
    });
};
