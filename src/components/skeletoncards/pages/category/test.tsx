import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import GradientView from '@/components/shared/GradientView';
import Colors from '@/constants/color';
import {IMAGES} from '@/assests/images';
import {
  normalizeFont,
  normalizeHeight,
  normalizeWidth,
  normalizeWithScale,
} from '@/utils/styleUtil';
import {FontType, typography} from '@/utils/fontUtil';
import Header from '@/components/shared/Header';
import {requestTestRecordById} from '@/services/testService';

type TestItemRouteParams = {
  test_id: string;
};

const TestItem: React.FC = () => {
  const route = useRoute<RouteProp<{params: TestItemRouteParams}, 'params'>>();
  const {test_id} = route.params;

  const [testData, setTestData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTestData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTestData = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await requestTestRecordById(test_id);
      console.log(response);
      setTestData(response);
    } catch (err: any) {
      setError('Failed to fetch Test data');
    }

    setLoading(false);
  };

  return (
    <View style={{backgroundColor: Colors.lightblue, flex: 1}}>
      <Header title={'Test'} />

      <ImageBackground
        source={IMAGES.result}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <View style={styles.MainContainer}>
          {loading ? (
            <ActivityIndicator
              size="large"
              color={Colors.blue}
              style={{marginTop: 20}}
            />
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : (
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
              {testData && (
                <>
                  {Object.keys(testData).map((key, index) => {
                    if (key === '_id' || key === 'user-id') {
                      return null;
                    }
                    return (
                      <GradientView
                        endColor={Colors.cosmos_blue}
                        startColor={Colors.blue}
                        startAngleX={0}
                        startAngleY={0}
                        endAngleX={1}
                        endAngleY={0}
                        opacity={1}
                        style={styles.container}>
                        <Text key={index} style={styles.dataText}>
                          {key.toUpperCase()}: {testData[key] || 'NA'}
                        </Text>
                      </GradientView>
                    );
                  })}
                </>
              )}
            </ScrollView>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: normalizeHeight(30),
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
  MainContainer: {
    flex: 1,
    marginBottom: normalizeHeight(20),
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  image: {
    width: '100%',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: normalizeFont(16),
    fontWeight: 'bold',
  },
  backgroundImage: {
    justifyContent: 'center', // Aligns content vertically
    alignItems: 'center', // Aligns content horizontally
    width: '100%',
    height: '100%',
  },
});

export default TestItem;
