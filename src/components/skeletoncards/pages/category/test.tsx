import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {
  normalizeFont,
  normalizeHeight,
  normalizeWidth,
  normalizeWithScale,
} from '@/utils/styleUtil';
import GradientView from '@/components/shared/GradientView';
import Colors from '@/constants/color';
import {FontType, typography} from '@/utils/fontUtil';

interface TestItemProps {
patientName?: string;
  patientAge?: number;
  testDateTime?: string;
  appearance?: string;
  colour?: string;
  pH?: string;
  specificGravity?: string;
  protein?: string;
  glucose?: string;
  ketoneBodies?: string;
  bilirubin?: string;
  urobilinogen?: string;
  leucocyteEsterase?: string;
  bloodHemoglobin?: string;
  nitrite?: string;
  redBloodCells?: string;
  whiteBloodCells?: string;
  epithelialCells?: string;
  cast?: string;
  crystals?: string;
  bacteria?: string;
  yeast?: string;
  mucusThreads?: string;
  };


const TestItem: React.FC<TestItemProps> = ({
  patientName,
  patientAge,
  testDateTime,
  appearance,
  colour,
  pH,
  specificGravity,
  protein,
  glucose,
  ketoneBodies,
  bilirubin,
  urobilinogen,
  leucocyteEsterase,
  bloodHemoglobin,
  nitrite,
  redBloodCells,
  whiteBloodCells,
  epithelialCells,
  cast,
  crystals,
  bacteria,
  yeast,
  mucusThreads,
}) => {
 const data = [
   {label: 'Patient Name', value: patientName},
   {label: 'Patient Age', value: patientAge},
   {label: 'Test Date & Time', value: testDateTime},
   {label: 'Appearance', value: appearance},
   {label: 'Colour', value: colour},
   {label: 'pH', value: pH},
   {label: 'Specific Gravity', value: specificGravity},
   {label: 'Protein', value: protein},
   {label: 'Glucose', value: glucose},
   {label: 'Ketone Bodies', value: ketoneBodies},
   {label: 'Bilirubin', value: bilirubin},
   {label: 'Urobilinogen', value: urobilinogen},
   {label: 'Leucocyte Esterase', value: leucocyteEsterase},
   {label: 'Blood/Hemoglobin', value: bloodHemoglobin},
   {label: 'Nitrite', value: nitrite},
   {label: 'Red Blood Cells', value: redBloodCells},
   {label: 'White Blood Cells', value: whiteBloodCells},
   {label: 'Epithelial Cells', value: epithelialCells},
   {label: 'Cast', value: cast},
   {label: 'Crystals', value: crystals},
   {label: 'Bacteria', value: bacteria},
   {label: 'Yeast', value: yeast},
   {label: 'Mucus Threads', value: mucusThreads},
 ];

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
    marginBottom: normalizeHeight(20),
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

export default TestItem;
