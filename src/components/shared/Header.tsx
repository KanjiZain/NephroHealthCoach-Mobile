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
import {normalizeFont, normalizeHeight} from '@/utils/styleUtil';
import Spacer from '.';
import Title from '../title';
import {Theme} from '@/theme';
import CenterView from './CenterView';
import FontAwesomeWrapper from '@/wrapper/fontAwesomeWrapper';
import {faChevronCircleLeft} from '@fortawesome/free-solid-svg-icons/faChevronCircleLeft';
import Colors from '@/constants/color';

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
  subTitleTextContainer,
  subTitleText,
  containerStyle,
}) => {
  const navigation = useNavigation();

  const onBackButtonPressed = () => {
    navigation.goBack();
  };

  return (
    <CenterView>
      <View style={[styles.headerView, containerStyle && containerStyle]}>
        <TouchableOpacity
          onPress={onBackButtonPressed}
          style={styles.backButton}>
          <FontAwesomeWrapper
            icon={faChevronCircleLeft}
            color={Colors.cosmos_blue}
            size={normalizeFont(30)}
          />
        </TouchableOpacity>
        <View style={styles.title_heading}>
          <Title title={title || ''} titlestyle={Theme.Title.page_title} />
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
    marginTop: normalizeHeight(10),
  },
  title_heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: normalizeHeight(10),
  },
});

export default Header;
