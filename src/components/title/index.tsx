import Colors from '@/constants/color';
import {typography} from '@/utils/fontUtil';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface TitleProps {
  title: string;
  spantext?: string;
  titlestyle?: Record<string, any>;
  spanstyle?: Record<string, any>;
  rightStyle?: Record<string, any>;
  isEditable?: boolean;
  toggleEdit?: () => void;
  fontstyle?: {
    fontSize?: number;
    fontFamily?: string;
    color?: string;
    marginVertical?: number;
  };
}

const Title: React.FC<TitleProps> = ({
  title,
  titlestyle,
  spanstyle,
  spantext,
}) => {
  return (
    <View style={[styles.container && styles.fullWidth]}>
      <Text style={titlestyle}>
        {title}
        {spantext && <Text style={spanstyle}>{spantext}</Text>}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  rightText: {
    textAlign: 'right',
  },
  rightStyle: {
    ...typography.body4,
    color: Colors.gray,
  },
});

export default Title;
