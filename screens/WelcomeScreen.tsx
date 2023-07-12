import { StyleSheet, Text, View } from 'react-native';

function WelcomeScreen() {
  return (
    <View style={styles.rootContainer}>
      <Text>Authentication successful</Text>
      <Text style={styles.title}>Welcome!</Text>
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
