import Colors from '@/constants/color';
import React, {ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

interface WrapperProps {
  children: ReactNode;
  containerStyle?: Record<string, any>;
}

const Wrapper: React.FC<WrapperProps> = ({children, containerStyle}) => {
  return (
    <SafeAreaView
      style={[styles.centeredView, containerStyle && containerStyle]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: Colors.cosmos_blue,
  },
  
});

export default Wrapper;
