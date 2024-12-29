import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NAVIGATION_ROUTES, NAVIGATION_ROUTES_AUTH, NAVIGATION_ROUTES_MAIN} from '@/constants/screenName';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { IStateReducers } from '@/store/types';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const {isAuthenticated} = useSelector(
      (state: IStateReducers) => state.auth,
    );
  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        <Stack.Navigator initialRouteName={NAVIGATION_ROUTES.AUTH.SPLASH}>
          <>
            {NAVIGATION_ROUTES_AUTH.map((screen, index) => (
              <Stack.Screen
                key={index}
                name={screen.name}
                component={screen.component}
                options={screen.options}
              />
            ))}
          </>
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName={NAVIGATION_ROUTES.MAIN.HOME}>
          <>
            {NAVIGATION_ROUTES_MAIN.map((screen, index) => (
              <Stack.Screen
                key={index}
                name={screen.name}
                component={screen.component}
                options={screen.options}
              />
            ))}
          </>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
