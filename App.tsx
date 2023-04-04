import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';
import { AuthContextProvider } from 'src/contexts/AuthContext';

import { THEME } from "./src/theme"
import { Loading } from '@components/Loading';

export default function App() {
  const [fontLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle='light-content'
        translucent
      />

      <AuthContextProvider>
        {fontLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}