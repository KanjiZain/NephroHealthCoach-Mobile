import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import GradientView from '@/components/shared/GradientView';
import Title from '../title';
import {useTypedSelector} from '@/store';
import {capitalizeFirstLetter, getInitials} from '@/helpers';
import {
  normalizeHeight,
  normalizeWidth,
  normalizeWithScale,
} from '@/utils/styleUtil';
import {typography} from '@/utils/fontUtil';
import Colors from '@/constants/color';

export default function HeaderBanner({}) {
  const {firstName} = useTypedSelector(state => state.auth);
  const userInitials = getInitials(firstName);
  const firstLetter = capitalizeFirstLetter(firstName);
  return (
    <GradientView
      startColor={Colors.blue}
      endColor={Colors.cosmos_blue}
      startAngleX={0}
      startAngleY={0}
      endAngleX={1}
      endAngleY={0}
      opacity={1}
      style={styles.bannerContainer}>
      <View style={styles.bannerContent}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarInitials}>{userInitials}</Text>
        </View>
        <Title
          title={`Welcome,  ${firstLetter}`}
          titlestyle={styles.titleText}
        />
      </View>
    </GradientView>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.blue,
    padding: normalizeWithScale(16),
    borderRadius: normalizeWithScale(5),
    height: normalizeHeight(65),
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: normalizeHeight(20),
  },
  titleText: {
    ...typography.h3,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalizeWidth(10),
  },

  avatarCircle: {
    width: normalizeWidth(40),
    height: normalizeHeight(40),
    borderRadius: normalizeWidth(20),
    backgroundColor: `${Colors.cosmos_blue}`,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarInitials: {
    color: Colors.white,
    fontSize: normalizeWithScale(18),
    fontWeight: 'bold',
  },
  notificationBadge: {
    position: 'relative',
    top: normalizeHeight(-5),
    right: normalizeWidth(-5),
    backgroundColor: Colors.Camel,
    width: normalizeWidth(20),
    height: normalizeHeight(20),
    borderRadius: normalizeWithScale(15),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
