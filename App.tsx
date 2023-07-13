import { StatusBar } from 'expo-status-bar';
import { AuthContextProvider } from './store/authContext';
import { Navigation } from './navigators/Navigation';

export default function App() {
  return (
    <>
      <StatusBar style="light" />

      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}
