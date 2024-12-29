//@ts-ignore
import AppNavigator from '@/screens/AppNavigator';
//@ts-ignore
import React from 'react';
import {LogBox} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Orientation from 'react-native-orientation-locker';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {store} from './src/store/index';
import {toastConfig} from './src/utils/toastUtil';

LogBox.ignoreAllLogs(true);
console.warn = () => {};
console.error = () => {};
Orientation.lockToPortrait();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
          <AppNavigator />
          <Toast config={toastConfig as any} />
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
