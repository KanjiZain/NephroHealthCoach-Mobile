/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import {IMAGES} from '@/assests/images';
import EmptylistView from '@/components/shared/EmptyListView';
import Header from '@/components/shared/Header';
import DietItem from '@/components/skeletoncards/pages/category/DietPlan';
import Colors from '@/constants/color';
import Wrapper from '@/theme/Wrapper';
import {IDietState} from '@/types';
import {normalizeWithScale} from '@/utils/styleUtil';
import FontAwesomeWrapper from '@/wrapper/fontAwesomeWrapper';
import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function DietPlans() {
  const [loading, setLoading] = useState(true);
  const [dietplan, setDietplan] = useState([
    {
      id: 123,
      gfrResult: 77,
      ckdStageMessage:
        'Stage 2: Kidney damage with mild loss of kidney function.',
      mealPlan: {
        breakfast:
          '1 CD-sized chapatti or paratha + 6-7 tbsp curry/omelet + tea',
        midMeal: '1-2 apples or ¼ cup of melons',
        lunch:
          '1-2 CD-sized chapatti/1 cup boiled rice + 5-6 tbsp curry or lentils + salad',
        eveningNourishment: '1-2 cups of popcorns + tea',
        dinner: '1-2 CD-sized chapatti + 5-6 tbsp curry + salad',
        bedtime: '1 cup low-fat milk + honey',
      },
    },
  ]);

  useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 3000);
  });

  const renderItem = ({item}: {item: IDietState}) => <DietItem {...item} />;

  useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 3000);
  });

  return (
    <View style={{flex: 1, backgroundColor: Colors.cosmos_blue}}>
      <ImageBackground
        source={IMAGES.diet_bg}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <Header title={'Deit Plans'} />
        <View style={{flex: 1}}>
          {loading ? (
            <View>
              <ActivityIndicator size={'large'} />
            </View>
          ) : (
            <></>
          )}
          {loading ? (
            <></>
          ) : (
            <FlatList
              data={dietplan}
              bounces={false}
              renderItem={renderItem}
              ListFooterComponent={() => {
                return loading && !dietplan?.length ? (
                  <ActivityIndicator size={'large'} />
                ) : (
                  <></>
                );
              }}
              ListEmptyComponent={() => {
                return (
                  <EmptylistView>
                    <FontAwesomeWrapper
                      icon={faTriangleExclamation}
                      size={normalizeWithScale(30)}
                      color={Colors.white}
                    />
                    <Text>No Data Available</Text>
                    <Text>Please try again later.</Text>
                  </EmptylistView>
                );
              }}
            />
          )}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    justifyContent: 'center', // Aligns content vertically
    alignItems: 'center', // Aligns content horizontally
    width: '100%',
    height: '100%',
  },
});
