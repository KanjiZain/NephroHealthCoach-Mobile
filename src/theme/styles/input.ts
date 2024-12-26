import {
  normalizeFont,
  normalizeHeight,
  normalizeWidth,
  normalizeWithScale,
} from '@/utils/styleUtil';
import {FontType} from '@/utils/fontUtil';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const Input = {
  primary: {
    fontSize: normalizeFont(200),
    fontFamily: FontType.Outfit.Regular,
    color: Colors.white,
    backgroundColor: Colors.transparent,
    marginVertical: normalizeHeight(2),
    marginHorizontal: normalizeWidth(2),
    borderColor: Colors.white,
    paddingVertical: normalizeHeight(5),
    paddingHorizontal: normalizeWidth(10),
    borderWidth: normalizeWidth(1),
    borderRadius: normalizeWithScale(10),
  },
};
