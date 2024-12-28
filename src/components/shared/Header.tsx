import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';

import {GenericNavigationType} from '@/types/navigation';
import {useNavigation} from '@react-navigation/native';
import {normalizeHeight, normalizeWithScale} from '@/utils/styleUtil';
import Spacer from '.';
import Title from '../title';
import {Theme} from '@/theme';
import CenterView from './CenterView';

interface HeaderProps {
  inputstyle?: InputStyleProps;
  containerStyle?: any;
  title?: string | undefined;
  subtitle?: string;
  handleOnBack?: () => void;
  navigation?: GenericNavigationType;
  renderIcon?: () => React.ReactNode;
  subTitleTextContainer?: ViewStyle;
  subTitleText?: TextStyle;
}

interface InputStyleProps {}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  renderIcon,
  subTitleTextContainer,
  subTitleText,
  containerStyle,
}) => {
  return (
    <CenterView>
      <View style={[styles.headerView, containerStyle && containerStyle]}>
        {!subtitle && <Spacer size={normalizeHeight(10)} />}
        <View style={styles.title_heading}>
          <Title title={title || ''} titlestyle={Theme.Title.page_title} />

          {renderIcon && <View style={styles.icon}>{renderIcon()}</View>}
        </View>
        {subtitle && (
          <View
            style={[
              styles.textContainer,
              subTitleTextContainer && subTitleTextContainer,
            ]}>
            <Title
              title={subtitle || ''}
              titlestyle={[
                Theme.Title.page_title_subheading,
                subTitleText && subTitleText,
              ]}
            />
            {!subtitle && <Spacer size={normalizeHeight(10)} />}
          </View>
        )}
        {!subtitle && <Spacer size={normalizeHeight(10)} />}
      </View>
    </CenterView>
  );
};

const styles = StyleSheet.create({
  headerView: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: normalizeWithScale(10),
    marginTop: normalizeHeight(10),
  },
  title_heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    marginTop: normalizeHeight(10),
    alignItems: 'center',
  },
});

export default Header;
