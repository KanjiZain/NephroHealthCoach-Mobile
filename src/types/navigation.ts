import {NavigationProp, RouteProp} from '@react-navigation/native';

export interface GenericNavigationType {
  navigation: NavigationProp<any>;
  route?: RouteProp<any, any> | undefined;
}
