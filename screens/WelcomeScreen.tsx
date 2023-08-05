import { useEffect, useState, useContext } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import axios, { AxiosError } from 'axios';
import { API_KEY, DB_URL } from '../config/keys';
import { AuthContext } from '../store/authContext';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

function WelcomeScreen() {
  const [secretMessage, setSecretMessage] = useState('');
  const [hasTokenExpired, setHasTokenExpired] = useState(false); // [1
  const { token, refreshToken, authenticate } = useContext(AuthContext);

  const getFreshToken = () => {
    axios
      .post(`https://securetoken.googleapis.com/v1/token?key=${API_KEY}`, {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      })
      .then((res) => {
        console.log(res.data);
        console.log('TRYING TO REFRESH TOKEN');
        return res.data;
      })
      .then(({ id_token, refresh_token }) => {
        authenticate(id_token, refresh_token);
        setHasTokenExpired(false);
      })
      .catch(console.error);
  };

  const getSecretMessage = () => {
    axios
      .get(`${DB_URL}/message.json?auth=${token}`)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .then(setSecretMessage)
      .catch((error: AxiosError) => {
        console.log(error.code);
        setHasTokenExpired(true);
      });
  };

  useEffect(() => {
    if (hasTokenExpired) getFreshToken();
    else getSecretMessage();
  }, [hasTokenExpired]);

  if (!secretMessage) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <View style={styles.rootContainer}>
      <Text>Authentication successful</Text>
      <Text style={styles.title}>Welcome!</Text>
      <Text>{secretMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
  },
});
