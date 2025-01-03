import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
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

  const handleLogout = () => {
    console.log('Logout button pressed');
  };

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
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
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
  logoutButton: {
    backgroundColor: Colors.lightGrey,
    paddingVertical: normalizeHeight(5),
    paddingHorizontal: normalizeWidth(12),
    borderRadius: normalizeWithScale(5),
  },
  logoutButtonText: {
    color: Colors.black,
    fontSize: normalizeWithScale(14),
    fontWeight: 'bold',
  },
});
