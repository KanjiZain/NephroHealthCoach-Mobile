import Colors from '@/constants/color';
import {FontType} from '@/utils/fontUtil';
import {
  normalizeFont,
  normalizeHeight,
  normalizeWidth,
  normalizeWithScale,
} from '@/utils/styleUtil';

export const Title = {
  title: {
    fontSize: normalizeFont(42),
    fontFamily: FontType.Outfit.Bold,
    color: Colors.white,
    marginVertical: normalizeHeight(5),
  },
  title_subheading: {
    fontSize: normalizeFont(20),
    fontFamily: FontType.Outfit.Light,
    color: Colors.white,
    marginLeft: normalizeWidth(50),
  },
  login_button_title: {
    fontSize: normalizeFont(17),
    fontFamily: FontType.Outfit.SemiBold,
    color: Colors.white,
    marginVertical: normalizeHeight(3),
  },
  page_title: {
    fontSize: normalizeFont(16),
    fontFamily: FontType.Outfit.Bold,
    color: Colors.white,
    marginVertical: normalizeHeight(5),
  },
  page_title_subheading: {
    fontSize: normalizeFont(14),
    color: Colors.white,
    marginVertical: normalizeHeight(5),
    padding: normalizeWithScale(10),
    textAlign: 'center',
  },
  input_title_subheading: {
    fontSize: normalizeFont(15),
    fontFamily: FontType.Outfit.Regular,
    color: Colors.white,
    marginBottom: normalizeHeight(2),
    marginLeft: normalizeWidth(2),
    padding: normalizeWithScale(3),
    textAlign: 'center',
  },
};
