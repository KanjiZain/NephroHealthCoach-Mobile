import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {IconProp, Transform} from '@fortawesome/fontawesome-svg-core';
import {StyleProp, ViewStyle} from 'react-native/types';

export type IFontAwesomeIconStyle = StyleProp<ViewStyle> & {
  color?: string;
};

interface IFontAwesomeWrapper {
  icon: IconProp;
  size?: number;
  color?: string;
  secondaryColor?: string;
  secondaryOpacity?: number;
  mask?: IconProp;
  maskId?: string;
  transform?: string | Transform;
  style?: IFontAwesomeIconStyle;
  testID?: string;
}

const FontAwesomeWrapper = (props: IFontAwesomeWrapper) => {
  return <FontAwesomeIcon {...props} />;
};

export default FontAwesomeWrapper;
