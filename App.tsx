/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { NativeBaseProvider, StatusBar } from 'native-base';
import React, {type PropsWithChildren} from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainStackNavigator from './src/screens/MainStackNavigator';


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NativeBaseProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={{flex: 1}}>
        <MainStackNavigator/>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default App;
