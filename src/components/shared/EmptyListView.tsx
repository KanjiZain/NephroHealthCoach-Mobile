import React, {ReactNode} from 'react';
import {ViewStyle} from 'react-native';
import {View} from 'react-native';

interface EmptylistView {
  children: ReactNode;
  style?: ViewStyle;
}

const EmptylistView: React.FC<EmptylistView> = ({children, style}) => {
  return <View style={style}>{children}</View>;
};

export default EmptylistView;
