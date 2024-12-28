import React, {ReactNode} from 'react';
import {View, StyleSheet} from 'react-native';

interface CenterViewProps {
  children: ReactNode;
  containerStyle?: any;
}

const CenterView: React.FC<CenterViewProps> = ({children, containerStyle}) => {
  return (
    <View style={[styles.centeredView, containerStyle && containerStyle]}>
      {children}
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export default CenterView;
