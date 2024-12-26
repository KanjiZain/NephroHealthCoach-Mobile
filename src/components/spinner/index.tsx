import React from 'react';
import {ActivityIndicator, ViewStyle, StyleSheet, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface SpinnerProps {
  size?: number;
  color?: string;
  style?: ViewStyle;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 25,
  color = Colors.white,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Spinner;
