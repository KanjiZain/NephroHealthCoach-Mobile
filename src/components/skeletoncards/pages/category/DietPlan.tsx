import React from 'react';
import {View, Text, StyleSheet, ScrollView,FlatList} from 'react-native';
import {
  normalizeFont,
  normalizeHeight,
  normalizeWidth,
  normalizeWithScale,
} from '@/utils/styleUtil';
import GradientView from '@/components/shared/GradientView';
import Colors from '@/constants/color';
import {FontType, typography} from '@/utils/fontUtil';
  
interface DietItemProps {
  gfrResult: number;
  ckdStageMessage: string;
  mealPlan: {
    breakfast?: string | null;
    midMeal?: string | null;
    lunch?: string | null;
    eveningNourishment?: string | null;
    dinner?: string | null;
    bedtime?: string | null;
  };
}

const DietItem: React.FC<DietItemProps> = ({
  gfrResult,
  ckdStageMessage,
  mealPlan,
}) => {
  const data = [
    {label: 'GFR Result', value: gfrResult},
    {label: 'CKD Stage', value: ckdStageMessage},
  ];

  const mealPlanData = Object.entries(mealPlan).map(([key, value]) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value: value || 'Not specified',
  }));


  return (
    <View style={styles.MainContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {data.map((item, index) => (
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
              {item.label}: {item.value}
            </Text>
          </GradientView>
        ))}
        <GradientView
          endColor={Colors.cosmos_blue}
          startColor={Colors.blue}
          startAngleX={0}
          startAngleY={0}
          endAngleX={1}
          endAngleY={0}
          opacity={1}
          style={styles.container}>
          <FlatList
            data={mealPlanData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <Text style={styles.dataText}>
                {'\u2022'} {item.label}: {item.value}
                {'\n'} {'\n'}
              </Text>
            )}
          />
        </GradientView>
      </ScrollView>
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
    marginBottom:normalizeHeight(20)
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  image: {
    width: '98%',
    height: '12%',
  },
  item: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  value: {
    flex: 1,
  },
});

export default DietItem;
