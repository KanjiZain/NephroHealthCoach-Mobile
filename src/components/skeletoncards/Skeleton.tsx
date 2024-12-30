import Colors from '@/constants/color';
import {isString} from 'lodash';
import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, ViewStyle} from 'react-native';

type SkeletonProps = {
  width: number | string;
  height: number | string;
  style?: ViewStyle;
  variant?: 'box' | 'cricle';
};

const Skeleton: React.FC<SkeletonProps> = ({width, height, variant, style}) => {
  const opacity = useRef(new Animated.Value(0.3));

  let borderRadius = 0;
  if (variant === 'cricle') {
    borderRadius = isString(height) ? parseInt(height, 10) / 2 : height / 2;
  }

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.2,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {opacity: opacity.current, height, width, borderRadius},
        styles.skeleton,
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: Colors.gray,
  },
});

export default Skeleton;
