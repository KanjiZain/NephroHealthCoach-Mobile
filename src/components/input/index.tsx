import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ViewStyle,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import {FontType, typography} from '@/utils/fontUtil';
import {
  normalizeFont,
  normalizeHeight,
  normalizeWidth,
  normalizeWithScale,
} from '@/utils/styleUtil';

import FontAwesomeWrapper from '@/wrapper/fontAwesomeWrapper';
import {faEye, faEyeSlash, faSearch} from '@fortawesome/free-solid-svg-icons';
import Title from '../title';
import Colors from '@/constants/color';

interface IValidate {
  regex?: RegExp;
  errorMessage: string;
  validate?: () => boolean;
  isNumeric?: boolean | null;
}

interface InputStyleProps {
  isNumeric?: boolean;
  titleText?: string;
  placeholder?: string;
  containerStyle?: ViewStyle;
  inputStyle?: Record<string, any>;
  titleStyle?: Record<string, any>;
  onChange?: (text: string) => void;
  value?: string;
  secureTextEntry?: boolean;
  defaultText?: string;
  placeholderTextColor?: string;
  renderInputLeft?: (error?: boolean) => React.ReactNode;
  renderInputRight?: () => React.ReactNode;
  validate?: IValidate;
  search?: boolean;
  errors?: string;
  isEditable?: boolean;
  confirmPasswordValue?: string;
  fontstyle?: {
    fontSize?: number;
    fontFamily?: string;
    color?: string;
    marginVertical?: number;
  };
  multiline?: boolean;
  numberOfLines?: number;
  readOnly?: boolean;
}

const CustomInput = ({
  multiline = false,
  numberOfLines = 1,
  isNumeric,
  placeholder,
  containerStyle,
  inputStyle,
  onChange,
  value = '',
  secureTextEntry = false,
  defaultText,
  renderInputLeft,
  renderInputRight,
  titleText,
  titleStyle,
  placeholderTextColor,
  validate,
  search = false,
  errors,
  isEditable,
  readOnly,
}: InputStyleProps) => {
  const [inputValue, setInputValue] = useState(
    defaultText ? defaultText : value,
  );
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleOnChange = (text: string) => {
    setInputValue(text);

    setError(null);

    if (validate) {
      if (validate.regex && !validate.regex.test(text)) {
        setError(validate.errorMessage);
      } else {
        setError(null);
      }
    }

    if (onChange) {
      onChange(text);
      setError(null);
    }
  };
  const handleFocus = () => {
    setIsFocused(true);
    if (validate && validate.regex && validate.regex.test(inputValue)) {
      setError(null);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (inputValue.trim() !== '') {
      if (validate) {
        if (validate.regex && !validate.regex.test(inputValue)) {
          setError(validate.errorMessage);
        } else {
          setError(null);
        }
      }
    }
  };

  const togglePasswordVisibility = () => {
    if (secureTextEntry === true) {
      setIsPasswordVisible(!isPasswordVisible);
    }
  };

  const isRTL = I18nManager.isRTL;

  return (
    <>
      {titleText && titleText.length > 0 && (
        <Title title={titleText} titlestyle={[styles.titleText, titleStyle]} />
      )}

      <View
        style={[
          styles.container,
          containerStyle,
          isFocused ? styles.containerFocused : styles.containerUnfocused,
          error ? styles.containerError : {},
          search && styles.borderStyle,
        ]}>
        {renderInputLeft && renderInputLeft()}
        {search && (
          <FontAwesomeWrapper
            icon={faSearch}
            color={Colors.white}
            size={normalizeFont(20)}
            style={[styles.searchIcon, isRTL && styles.searchIconRTL]}
          />
        )}
        <TextInput
          keyboardType={isNumeric ? 'numeric' : 'default'}
          placeholder={placeholder}
          editable={isEditable}
          style={[
            styles.input,
            inputStyle,
            search ? styles.inputWithSearch : {},
            error ? styles.errorTextInput : {},
            isRTL && styles.inputRTL,
          ]}
          autoCapitalize="none"
          onChangeText={handleOnChange}
          secureTextEntry={
            secureTextEntry === true ? !isPasswordVisible : secureTextEntry
          }
          value={value}
          placeholderTextColor={placeholderTextColor || Colors.cosmos_blue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          multiline={multiline}
          numberOfLines={numberOfLines}
          readOnly={readOnly}
        />
        {secureTextEntry === true && (
          <TouchableOpacity
            style={[styles.iconRight, isRTL && styles.iconRightRTL]}
            onPress={togglePasswordVisibility}>
            <FontAwesomeWrapper
              icon={isPasswordVisible ? faEyeSlash : faEye}
              color={Colors.cosmos_blue}
              size={normalizeFont(23)}
            />
          </TouchableOpacity>
        )}
        {renderInputRight && renderInputRight()}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
      {errors && <Text style={styles.errorText}>{errors}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    flex: 1,
    borderWidth: 1,
    position: 'relative',
    minHeight: normalizeHeight(60),
  },
  containerFocused: {
    borderColor: Colors.cosmos_blue,
  },
  containerUnfocused: {
    borderColor: Colors.cosmos_blue,
  },
  containerError: {
    borderColor: Colors.red,
  },
  input: {
    fontFamily: FontType.Outfit.Regular,
    flex: 1,
    fontSize: normalizeFont(17),
    color: Colors.cosmos_blue,
    padding: normalizeWithScale(10),
  },
  inputWithSearch: {
    paddingLeft: normalizeWithScale(40),
  },
  inputRTL: {
    textAlign: 'right',
    paddingLeft: normalizeWithScale(10),
  },
  titleText: {
    ...typography.body2,
    fontFamily: FontType.Outfit.Regular,
    marginBottom: normalizeHeight(2),
    marginLeft: normalizeWidth(2),
    textAlign: 'center',
    borderColor: Colors.cosmos_blue,
  },
  errorText: {
    color: Colors.red,
    marginTop: normalizeHeight(5),
    marginLeft: normalizeWidth(2),
    fontSize: normalizeFont(14),
  },

  errorTextInput: {
    color: Colors.red,
  },

  iconRightRTL: {
    left: normalizeWidth(-5),
  },
  searchIcon: {
    position: 'absolute',
    left: normalizeWidth(10),
    zIndex: 1, // Ensure the search icon is above the input
  },
  searchIconRTL: {
    left: undefined,
    right: normalizeWidth(10),
  },
  borderStyle: {borderRadius: 10},
  iconRight: {},
});

export default CustomInput;
