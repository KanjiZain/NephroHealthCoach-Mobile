import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NAVIGATION_ROUTES} from '@/constants/screenName';
import SplashScreen from './auth/splash';
import SignIn from './auth/Signin';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={NAVIGATION_ROUTES.AUTH.SPLASH}>
      <Stack.Screen
        name={NAVIGATION_ROUTES.AUTH.SPLASH}
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NAVIGATION_ROUTES.AUTH.SIGNIN}
        component={SignIn}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
