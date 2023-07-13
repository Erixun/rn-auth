import { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { DB_URL } from '../config/keys';
import { AuthContext } from '../store/authContext';

function WelcomeScreen() {
  const [secretMessage, setSecretMessage] = useState('');
  const { token } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(`${DB_URL}/message.json?auth=${token}`)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .then(setSecretMessage);
  }, []);

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
