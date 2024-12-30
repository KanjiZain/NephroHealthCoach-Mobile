/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {View, Text, ActivityIndicator, FlatList} from 'react-native';
import Colors from '@/constants/color';
import {IBmiState, IStateReducers} from '@/store/types';
import Wrapper from '@/theme/Wrapper';
import SkeletonCards from '@/components/skeletoncards/SkeletonCards';
import EmptylistView from '@/components/shared/EmptyListView';
import FontAwesomeWrapper from '@/wrapper/fontAwesomeWrapper';
import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';
import {normalizeWithScale} from '@/utils/styleUtil';
import Header from '@/components/shared/Header';
import BmiItem from '@/components/skeletoncards/pages/category/items';
import {useSelector} from 'react-redux';

export default function Bmi() {
  const [loading, setLoading] = useState(false);
  const {gender} = useSelector((state: IStateReducers) => state.auth);
  const userGender = gender || 'Not specified';
  const [bmi, setBmi] = useState([
    {
      age: 34,
      weight: 78,
      height: 165.1,
      bmi: '28.62',
      timestamp: '11/8/2024, 8:34:54 PM',
      gender,
    },
  ]);

  const renderItem = ({item}: {item: IBmiState}) => (
    <BmiItem
      key={item.timestamp}
      age={item.age}
      weight={item.weight}
      height={item.height}
      bmi={item.bmi}
      gender={item.gender}
    />
  );

  return (
    <Wrapper containerStyle={{backgroundColor: Colors.cosmos_blue}}>
      <Header title={'BMI'} />
      <View style={{flex: 1}}>
        {!bmi?.length && loading ? (
          <View>
            <SkeletonCards />
            <SkeletonCards />
            <SkeletonCards />
            <SkeletonCards />
            <SkeletonCards />
            <SkeletonCards />
          </View>
        ) : (
          <></>
        )}
        {loading && !bmi?.length ? (
          <></>
        ) : (
          <FlatList
            data={bmi}
            bounces={false}
            renderItem={renderItem}
            keyExtractor={(item: IBmiState) => item.timestamp}
            ListFooterComponent={() => {
              return loading && !bmi?.length ? (
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
                  <Text>No branches available.</Text>
                  <Text>Please try again later.</Text>
                </EmptylistView>
              );
            }}
          />
        )}
      </View>
    </Wrapper>
  );
}
