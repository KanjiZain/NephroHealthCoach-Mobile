import {normalizeWithScale} from '@/utils/styleUtil';
import React, {ReactNode} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

interface FullViewProps {
  children: ReactNode;
  containerStyle?: ViewStyle;
}

const FullView: React.FC<FullViewProps> = ({children, containerStyle}) => {
  return <View style={[styles.centeredView, containerStyle]}>{children}</View>;
};
const styles = StyleSheet.create({
  centeredView: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: normalizeWithScale(10),
  },
});

export default FullView;
