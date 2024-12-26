import {normalizeHeight, normalizeWidth} from '@/utils/styleUtil';
import {Colors} from 'react-native/Libraries/NewAppScreen';
export const Indicator = {
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalizeHeight(20),
  },
  indicator: {
    width: normalizeWidth(20),
    height: normalizeHeight(5),
    borderRadius: 5,
    marginHorizontal: normalizeWidth(2),
  },
  activeIndicator: {
    backgroundColor: Colors.light_brown,
  },
  inactiveIndicator: {
    backgroundColor: `${Colors.brown}80`,
  },
};
