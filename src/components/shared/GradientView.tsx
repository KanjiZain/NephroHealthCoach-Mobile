import React, {ReactNode} from 'react';
import {ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface GradientViewProps {
  children: ReactNode;
  style?: ViewStyle;
  startColor: string;
  endColor: string;
  startAngleY?: number;
  endAngleY?: number;
  startAngleX?: number;
  endAngleX?: number;
  opacity?: number; // If you want to apply opacity to the entire gradient
}

const GradientView: React.FC<GradientViewProps> = ({
  children,
  style,
  startColor,
  endColor,
  startAngleY = 0,
  endAngleY = 1,
  startAngleX = 0,
  endAngleX = 1,
  opacity = 1,
}) => {
  return (
    <LinearGradient
      colors={[startColor, endColor]}
      start={{x: startAngleX, y: startAngleY}}
      end={{x: endAngleX, y: endAngleY}}
      style={[style, {opacity}]}>
      {children}
    </LinearGradient>
  );
};

export default GradientView;
