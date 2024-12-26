import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, ViewStyle} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

import {TouchableOpacity} from 'react-native';
import { normalizeHeight, normalizeWidth, normalizeWithScale } from '@/utils/styleUtil';
import { FontType, typography } from '@/utils/fontUtil';
import Colors from '@/constants/color';

const styles = StyleSheet.create({
  labelStyle: {
    ...typography.h6,
    fontFamily: FontType.Outfit.Medium,
  },
  dropdown: {
    height: normalizeHeight(58),
    borderColor: Colors.white,
    borderWidth: normalizeWidth(1),
    borderRadius: normalizeWidth(10),
    paddingHorizontal: normalizeWidth(16),
    
  },
  icon: {
    marginRight: normalizeWidth(10),
  },
  placeholderStyle: {
    ...typography.h6,
    fontFamily: FontType.Outfit.Regular,
    color: `${Colors.white}`,
    opacity: 0.8,
    
  },
  selectedTextStyle: {
    ...typography.h6,
    fontFamily: FontType.Outfit.Medium,
    color: Colors.white,
    
  },
  iconStyle: {
    width: normalizeWithScale(20),
    height: normalizeWithScale(20),
  },
  inputSearchStyle: {
    height: normalizeHeight(10),
    ...typography.h6,
    fontFamily: FontType.Outfit.Medium,
  },
  itemTextStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...typography.body2,
    color: Colors.cosmos_blue,
    
  },
  mainContainer: {
    width: '100%',
  },
});

interface ISearchProps {
  label?: string;
  value?: string;
  search?: boolean;
  options: {label: string; value: string | number}[];
  onSelect: (value: string) => void;
  placeholder?: string;
  style?: ViewStyle;
  customDropdownStyle?: ViewStyle;
  isEditable?: boolean;
}

const Select = ({
  label,
  value,
  options,
  search = false,
  placeholder = '',
  onSelect,
  style,
  customDropdownStyle,
  isEditable,
}: ISearchProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const dropdownRef = useRef<DropdownRef>(null);

  type DropdownRef = {
    open: () => void;
    close: () => void;
  };

  // Update internal state when value prop changes
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const openDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.open();
    }
  };

  return (
    <TouchableOpacity
      style={[styles.mainContainer, style]}
      onPress={openDropdown}>
      {label && <Text style={styles.labelStyle}>{label}</Text>}
      <Dropdown
        style={[
          styles.dropdown,
          customDropdownStyle ? customDropdownStyle : {},
          isFocus && {borderColor: Colors.black},
        ]}
        ref={dropdownRef}
        iconColor={Colors.white}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={options}
        search={search}
        placeholder={!isFocus ? placeholder : '...'}
        searchPlaceholder="Search..."
        value={currentValue as any}
        onFocus={() => isEditable && setIsFocus(true)}
        onBlur={() => isEditable && setIsFocus(false)}
        onChange={(item: Record<string, any>) => {
          onSelect(item.value);
          setCurrentValue(item.value);
        }}
        itemTextStyle={styles.itemTextStyle}
        labelField="label"
        valueField="value"
        disable={!isEditable}
      />
    </TouchableOpacity>
  );
};

export default Select;
