import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {FontType} from '@/utils/fontUtil';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Spinner from '../spinner';

interface ButtonProps {
  title: string;
  buttonstyle?: ButtonStyleProps;
  buttondimensions?: ButtonDimensionsProps;
  fontstyle?: FontStyleProps;
  btnTextStyles?: Record<string, any>;
  iconname?: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  color?: string;
  renderLeft?: () => React.ReactNode;
}

interface ButtonDimensionsProps {
  buttonHeight?: string;
  buttonWidth?: string;
}

interface ButtonStyleProps {
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  backgroundColor?: string;
  marginVertical?: number;
  marginHorizontal?: number;
  marginTop?: number;
  borderColor?: string;
  padding?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  borderRadius?: number;
  borderWidth?: number;
  marginBottom?: number;
}

export interface FontStyleProps {
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  marginVertical?: number;
  marginHorizontal?: number;
  padding?: number;
}

const CustomButton: React.FC<ButtonProps> = ({
  title,
  buttonstyle,
  fontstyle,
  onPress,
  btnTextStyles,
  loading = false,
  disabled,
  color,
  renderLeft,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        // widthStyle,
        buttonstyle,
        ...(disabled ? [{opacity: 0.7}] : [{}]),
      ]}
      disabled={disabled || loading}>
      {renderLeft ? renderLeft() : <></>}
      {loading ? (
        <Spinner size={30} color={Colors.white} />
      ) : (
        <Text
          style={[
            styles.button_text,
            btnTextStyles,
            fontstyle,
            {color: color ? color : Colors.white},
          ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    textAlign: 'center',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  button_text: {
    fontFamily: FontType.Outfit.Bold,
    textAlign: 'center',
  },
  gradient: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomButton;
