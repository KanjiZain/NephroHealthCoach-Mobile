import {normalizeHeight, normalizeWidth} from '@/utils/styleUtil';
import React from 'react';
import {View, ViewStyle} from 'react-native';

interface SpacerProps {
  size?: number;
  horizontal?: boolean;
}

const Spacer: React.FC<SpacerProps> = ({size = 16, horizontal = false}) => {
  const style: ViewStyle = horizontal
    ? {width: normalizeWidth(size)}
    : {height: normalizeHeight(size)};

  return <View style={style} />;
};

export default Spacer;
