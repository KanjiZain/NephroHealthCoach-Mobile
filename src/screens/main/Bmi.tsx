/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, FlatList} from 'react-native';
import Colors from '@/constants/color';
import {IStateReducers} from '@/store/types';
import Wrapper from '@/theme/Wrapper';
import EmptylistView from '@/components/shared/EmptyListView';
import FontAwesomeWrapper from '@/wrapper/fontAwesomeWrapper';
import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';
import {normalizeHeight, normalizeWithScale} from '@/utils/styleUtil';
import Header from '@/components/shared/Header';
import BmiItem from '@/components/skeletoncards/pages/category/items';
import {useSelector} from 'react-redux';
import {IBmiState} from '@/types';

export default function Bmi() {
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 3000);
  });

  const renderItem = ({item}: {item: IBmiState}) => <BmiItem {...item} />;

  return (
    <View style={{flex: 1, backgroundColor: Colors.lightblue}}>
      <Header title={'BMI'} />
      <View style={{flex: 1}}>
        {loading ? (
          <View style={{marginTop: normalizeHeight(20)}}>
            <ActivityIndicator size={'large'} color={Colors.cosmos_blue} />
          </View>
        ) : (
          <></>
        )}
        {loading ? (
          <></>
        ) : (
          <FlatList
            data={bmi}
            bounces={false}
            renderItem={renderItem}
            keyExtractor={(item: IBmiState) => item.timestamp}
            ListFooterComponent={() => {
              return loading && !bmi?.length ? (
                <ActivityIndicator size={'large'} color={Colors.cosmos_blue} />
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
                  <Text>No Data available.</Text>
                  <Text>Please try again later.</Text>
                </EmptylistView>
              );
            }}
          />
        )}
      </View>
    </View>
  );
}
