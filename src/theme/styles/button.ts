import {FontType} from '@/utils/fontUtil';
import {
  normalizeFont,
  normalizeHeight,
  normalizeWidth,
  normalizeWithScale,
} from '@/utils/styleUtil';
import {Colors} from 'react-native/Libraries/NewAppScreen';
export const Button = {
  skip_button: {
    fontSize: normalizeFont(18),
    fontFamily: FontType.Outfit.Regular,
    color: Colors.white,
    backgroundColor: Colors.transparent,
    marginTop: normalizeHeight(20),
    marginHorizontal: normalizeWidth(15),
    paddingVertical: normalizeHeight(5),
    borderRadius: normalizeWithScale(50),
    borderWidth: normalizeWidth(1),
    borderColor: Colors.white,
    width: '25%',
  },

  login_button: {
    color: Colors.white,
    backgroundColor: Colors.flickering_gold,
    paddingVertical: normalizeHeight(12),
    paddingHorizontal: normalizeWidth(12),
    borderRadius: normalizeWithScale(10),
    borderColor: Colors.flickering_gold,
    borderWidth: 1,
  },
  signup_button: {
    color: Colors.white,
    backgroundColor: Colors.transparent,
    paddingVertical: normalizeHeight(12),
    paddingHorizontal: normalizeWidth(12),
    borderColor: Colors.white,
    borderRadius: normalizeWithScale(10),
    borderWidth: 1,
  },
  button_dimensions: {
    buttonWidth: '100%',
  },
};
