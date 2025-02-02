import {IMAGES} from '@/assests/images';
import {requestAllTestRecords} from '@/services/testService';
import {IStateReducers} from '@/store/types';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {useSelector} from 'react-redux';
import GradientView from '../shared/GradientView';
import {
  normalizeFont,
  normalizeHeight,
  normalizeWidth,
  normalizeWithScale,
} from '@/utils/styleUtil';
import {FontType, typography} from '@/utils/fontUtil';
import Colors from '@/constants/color';
import Header from '../shared/Header';
import EmptylistView from '../shared/EmptyListView';
import FontAwesomeWrapper from '@/wrapper/fontAwesomeWrapper';
import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';
import {NAVIGATION_ROUTES} from '@/constants/screenName';

interface TestRecord {
  ['_id']: string;
  ['patient-name']: string;
  ['test-date-time']: string;
}

const TestRecordsScreen: React.FC = ({navigation}: any) => {
  const {_id} = useSelector((state: IStateReducers) => state.auth);

  const [records, setRecords] = useState<TestRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    const data = await requestAllTestRecords(_id);
    setRecords(data);
    setLoading(false);
  };

  return (
    <View style={{backgroundColor: Colors.lightblue}}>
      <Header title={'Test List'} />
      <ImageBackground
        source={IMAGES.result}
        resizeMode="cover"
        style={styles.backgroundImage}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.blue} />
        ) : (
          <FlatList
            data={records}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
              <GradientView
                key={item._id}
                endColor={Colors.blue}
                startColor={Colors.blue}
                startAngleX={0}
                startAngleY={0}
                endAngleX={1}
                endAngleY={0}
                opacity={1}
                style={styles.container}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(NAVIGATION_ROUTES.MAIN.TestListing, {
                      test_id: item._id,
                    })
                  }>
                  <Text style={styles.dataText}>
                    {item['patient-name']}: {item['test-date-time']}
                  </Text>
                </TouchableOpacity>
              </GradientView>
            )}
            // eslint-disable-next-line react/no-unstable-nested-components
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
      </ImageBackground>
    </View>
  );
};

export default TestRecordsScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  container: {
    paddingVertical: normalizeHeight(20),
    borderRadius: normalizeWithScale(10),
    borderColor: Colors.white,
    borderWidth: normalizeWithScale(0.6),
    marginTop: normalizeHeight(20),
    paddingHorizontal: normalizeWidth(20),
    width: '95%',
    display: 'flex',
    alignSelf: 'center',
  },
  dataText: {
    ...typography.h3,
    fontFamily: FontType.Outfit.Regular,
    color: Colors.white,
    fontSize: normalizeFont(16),
  },
});
