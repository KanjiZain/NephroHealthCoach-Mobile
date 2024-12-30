import React from 'react';
import {View} from 'react-native-animatable';
import {StyleSheet} from 'react-native';
import {normalizeHeight, normalizeWidth} from '@/utils/styleUtil';
import Skeleton from './Skeleton';

export default function SkeletonCards() {
  return (
    <View style={styles.mainContainer}>
      <Skeleton
        width={normalizeWidth(50)}
        variant="cricle"
        height={normalizeHeight(50)}
      />
      <View style={styles.InsideView}>
        <Skeleton
          width={normalizeWidth(200)}
          variant="cricle"
          height={normalizeHeight(20)}
        />
        <Skeleton
          width={normalizeWidth(250)}
          variant="cricle"
          height={normalizeHeight(15)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    gap: normalizeWidth(10),
  },
  InsideView: {
    display: 'flex',
    flexDirection: 'column',
    gap: normalizeHeight(10),
  },
});
