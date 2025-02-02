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
import {requestDietPlan} from '@/services/dietPlanService';

type DietItemRouteParams = {
  diet_plan_id: string;
};

const DietItem: React.FC = () => {
  const route = useRoute<RouteProp<{params: DietItemRouteParams}, 'params'>>();
  const {diet_plan_id} = route.params;

  const [dietData, setDietData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDietData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDietData = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await requestDietPlan(diet_plan_id);
      console.log(response);
      setDietData(response);
    } catch (err: any) {
      setError('Failed to fetch BMI data');
    }

    setLoading(false);
  };

  return (
    <View style={{backgroundColor: Colors.lightblue, flex: 1}}>
      <Header title={'Diet Plan'} />

      <ImageBackground
        source={IMAGES.diet_bg}
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
              {dietData && (
                <>
                  {Object.keys(dietData).map((key, index) => {
                    // Skip rendering _id or user-id if not needed
                    if (key === '_id' || key === 'user_id') {
                      return null;
                    }

                    const value = dietData[key];

                    // Check if the value is an object and iterate over it if necessary
                    if (typeof value === 'object' && !Array.isArray(value)) {
                      return (
                        <GradientView
                          key={index}
                          endColor={Colors.cosmos_blue}
                          startColor={Colors.blue}
                          startAngleX={0}
                          startAngleY={0}
                          endAngleX={1}
                          endAngleY={0}
                          opacity={1}
                          style={styles.container}>
                          <Text style={styles.dataText}>
                            {key.toUpperCase()}:
                          </Text>
                          {Object.keys(value).map((nestedKey, nestedIndex) => (
                            <Text key={nestedIndex} style={styles.dataText}>
                              {nestedKey.toUpperCase()}:{' '}
                              {value[nestedKey] || 'NA'}
                            </Text>
                          ))}
                        </GradientView>
                      );
                    }

                    // If the value is not an object, render the key-value pair directly
                    return (
                      <GradientView
                        key={index}
                        endColor={Colors.cosmos_blue}
                        startColor={Colors.blue}
                        startAngleX={0}
                        startAngleY={0}
                        endAngleX={1}
                        endAngleY={0}
                        opacity={1}
                        style={styles.container}>
                        <Text style={styles.dataText}>
                          {key.toUpperCase()}: {value || 'NA'}
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
  backgroundImage: {
    justifyContent: 'center', // Aligns content vertically
    alignItems: 'center', // Aligns content horizontally
    width: '100%',
    height: '100%',
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
});

export default DietItem;
