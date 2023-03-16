import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';

import { THEME } from "./src/theme"
import { Loading } from './src/components/Loading';

export default function App() {
  const [fontLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle='light-content'
        translucent
      />
      {fontLoaded ? <Routes /> : <Loading />}

    </NativeBaseProvider>
  );
}