import Colors from '@/constants/color';
import {FontType} from '@/utils/fontUtil';
import {
  normalizeFont,
  normalizeHeight,
  normalizeWidth,
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
};
