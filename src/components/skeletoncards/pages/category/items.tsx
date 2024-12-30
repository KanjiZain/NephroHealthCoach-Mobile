import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {
  normalizeHeight,
  normalizeWidth,
  normalizeWithScale,
} from '@/utils/styleUtil';
import GradientView from '@/components/shared/GradientView';
import Colors from '@/constants/color';
import {FontType, typography} from '@/utils/fontUtil';
import {IMAGES} from '@/assests/images';

interface BmiItemProps {
  age: number;
  weight: number;
  height: number;
  bmi: string;
  gender?: string | null;
}

const BmiItem: React.FC<BmiItemProps> = ({
  age,
  weight,
  height,
  bmi,
  gender,
}) => {
  const data = [
    {label: 'Age', value: age},
    {label: 'Weight', value: `${weight} kg`},
    {label: 'Height', value: `${height} cm`},
    {label: 'BMI', value: bmi},
    {label: 'Gender', value: gender || 'Not specified'},
  ];

  return (
    <View style={styles.MainContainer}>
      <Image source={IMAGES.bmi} style={styles.image} />
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: normalizeHeight(35),
    borderRadius: normalizeWithScale(15),
    borderColor: Colors.white,
    width: '100%',
    borderWidth: normalizeWithScale(0.6),
    marginTop: normalizeHeight(15),
    gap: normalizeWidth(10),
    paddingHorizontal: normalizeWidth(20),
  },
  dataText: {
    ...typography.h3,
    fontFamily: FontType.Outfit.Light,
    color: Colors.white,
  },
  MainContainer: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  image: {
    width: '98%',
    height: '12%',
  },
});

export default BmiItem;
