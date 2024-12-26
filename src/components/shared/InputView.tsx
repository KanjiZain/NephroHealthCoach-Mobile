import {normalizeHeight} from '@/utils/styleUtil';
import React, {ReactNode} from 'react';
import {View, StyleSheet} from 'react-native';

interface InputViewProps {
  children: ReactNode;
  containerStyle?: any;
}

const InputView: React.FC<InputViewProps> = ({children, containerStyle}) => {
  return <View style={[styles.centeredView, containerStyle]}>{children}</View>;
};
const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    marginVertical: normalizeHeight(10),
  },
});

export default InputView;
