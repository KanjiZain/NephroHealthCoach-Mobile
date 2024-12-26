import AppNavigator from '@/screens/AppNavigator';
import { toastConfig } from '@/utils/toastUtil';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { LogBox } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Orientation from 'react-native-orientation-locker';
import Toast from 'react-native-toast-message';

LogBox.ignoreAllLogs(true);
console.warn = () => {};
console.error = () => {};
Orientation.lockToPortrait();

function App(): React.JSX.Element {


  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Toast config={toastConfig as any} />
        <AppNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
