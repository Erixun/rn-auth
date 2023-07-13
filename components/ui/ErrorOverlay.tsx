import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, ViewStyle, Text, TextStyle } from 'react-native';
import Button from './Button';
import { RootStackParamList } from '../../types/RootStackParamList';
import { Screen } from '../../types/Screen';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, Screen>;

export const ErrorOverlay = ({
  message,
  screen,
}: {
  message: string;
  screen: Screen;
}) => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <View style={$container}>
      <Text style={$title}>Error</Text>
      <Text>{message}</Text>
      <View style={$buttonContainer}>
        <Button onPress={() => navigation.replace(screen)}>Go Back</Button>
      </View>
    </View>
  );
};

const $container: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 32,
};

const $title: TextStyle = {
  fontSize: 20,
  fontWeight: 'bold',
  marginVertical: 8,
};

const $buttonContainer: ViewStyle = {
  marginVertical: 16,
};
