/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import { IMAGES } from '@/assests/images';
import EmptylistView from '@/components/shared/EmptyListView';
import Header from '@/components/shared/Header';
import TestItem from '@/components/skeletoncards/pages/category/test';
import Colors from '@/constants/color';
import {ITestState} from '@/types';
import {normalizeWithScale} from '@/utils/styleUtil';
import FontAwesomeWrapper from '@/wrapper/fontAwesomeWrapper';
import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';

export default function Tests() {
  const [loading, setLoading] = useState(true);
  const [testData, setTestData] = useState([
    {
      patientName: 'John Doe',
      patientAge: 45,
      testDateTime: '2025-01-02 14:30',
      appearance: 'Clear',
      colour: 'Yellow',
      pH: '6.5',
      specificGravity: '1.020',
      protein: 'Negative',
      glucose: 'Negative',
      ketoneBodies: 'Negative',
      bilirubin: 'Negative',
      urobilinogen: 'Normal',
      leucocyteEsterase: 'Negative',
      bloodHemoglobin: 'Negative',
      nitrite: 'Negative',
      redBloodCells: '0-2',
      whiteBloodCells: '1-3',
      epithelialCells: 'Few',
      cast: 'None',
      crystals: 'None',
      bacteria: 'None',
      yeast: 'None',
      mucusThreads: 'Few',
    },
  ]);

  useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 3000);
  });

  const renderItem = ({item}: {item: ITestState}) => <TestItem {...item} />;

  return (
    <View style={{flex: 1, backgroundColor: Colors.lightblue}}>
      <ImageBackground
        source={IMAGES.result}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <Header title={'Test Results'} />
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
              data={testData}
              bounces={false}
              renderItem={renderItem}
              ListFooterComponent={() => {
                return loading && !testData?.length ? (
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
