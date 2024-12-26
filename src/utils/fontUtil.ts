import {StyleSheet} from 'react-native';
import Colors from '@/constants/color';
import {normalizeFont} from './styleUtil';

export const FontType = {
  Outfit: {
    Regular: 'Outfit-Regular',
    SemiBold: 'Outfit-SemiBold',
    Medium: 'Outfit-Medium',
    Bold: 'Outfit-Bold',
    Light: 'Outfit-Light',
  },
};

export const typography = StyleSheet.create({
  h1: {
    fontFamily: FontType.Outfit.Bold,
    fontSize: normalizeFont(24),
    lineHeight: normalizeFont(30),
    color: Colors.white,
  },
  h2: {
    fontFamily: FontType.Outfit.Bold,
    fontSize: normalizeFont(22),
    lineHeight: normalizeFont(26),
    color: Colors.white,
  },
  h3: {
    fontFamily: FontType.Outfit.Bold,
    fontSize: normalizeFont(20),
    lineHeight: normalizeFont(24),
    color: Colors.white,
  },
  h4: {
    fontFamily: FontType.Outfit.Bold,
    fontSize: normalizeFont(18),
    lineHeight: normalizeFont(22),
    color: Colors.white,
  },
  h5: {
    fontFamily: FontType.Outfit.Bold,
    fontSize: normalizeFont(17),
    lineHeight: normalizeFont(20),
    color: Colors.white,
  },
  h6: {
    fontFamily: FontType.Outfit.Bold,
    fontSize: normalizeFont(16),
    lineHeight: normalizeFont(18),
    color: Colors.white,
  },
  body2: {
    fontFamily: FontType.Outfit.Medium,
    fontSize: normalizeFont(14),
    lineHeight: normalizeFont(16),
    color: Colors.white,
  },
  body4: {
    fontFamily: FontType.Outfit.Medium,
    fontSize: normalizeFont(12),
    lineHeight: normalizeFont(14),
    color: Colors.white,
  },
  body5: {
    fontFamily: FontType.Outfit.Medium,
    fontSize: normalizeFont(10),
    lineHeight: normalizeFont(12),
    color: Colors.white,
  },

  semiBold: {
    fontFamily: FontType.Outfit.SemiBold,
  },
  bold: {
    fontFamily: FontType.Outfit.Bold,
  },
  regular: {
    fontFamily: FontType.Outfit.Regular,
  },
  medium: {
    fontFamily: FontType.Outfit.Medium,
  },
});
