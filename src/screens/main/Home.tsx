/* eslint-disable @typescript-eslint/no-unused-vars */
import {IMAGES} from '@/assests/images';
import CenterView from '@/components/shared/CenterView';
import FullView from '@/components/shared/FullView';
import HeaderBanner from '@/components/shared/HeaderBanner';
import Title from '@/components/title';
import {HomeMenus, titleToRouteMap} from '@/constants';
import Colors from '@/constants/color';
import {NAVIGATION_ROUTES} from '@/constants/screenName';
import {IStateReducers} from '@/store/types';
import Wrapper from '@/theme/Wrapper';
import {GenericNavigationType} from '@/types/navigation';
import {FontType, typography} from '@/utils/fontUtil';
import {
  normalizeFont,
  normalizeHeight,
  normalizeWithScale,
} from '@/utils/styleUtil';
import FontAwesomeWrapper from '@/wrapper/fontAwesomeWrapper';
import React, {useRef, useState, useEffect} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  Animated,
} from 'react-native';
import {useSelector} from 'react-redux';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const BUTTON_SIZE = normalizeWithScale(55);
const PADDING = normalizeWithScale(10);

export default function Home({navigation}: GenericNavigationType) {
  const {_id} = useSelector((state: IStateReducers) => state.auth);

  const pan = useRef({
    x: SCREEN_WIDTH - BUTTON_SIZE - PADDING,
    y: SCREEN_HEIGHT - BUTTON_SIZE - PADDING,
  }).current;

  const [position, setPosition] = useState<{x: number; y: number}>({
    x: pan.x,
    y: pan.y,
  });

  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      Animated.sequence([
        // Fade out slowly
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
        // Fade in quickly
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();
    }, 2000);

    setTimeout(() => {
      clearInterval(blinkInterval);
    }, 8000);

    return () => clearInterval(blinkInterval);
  }, [fadeAnim]);

  const handlePageChange = (title: string) => {
    const routeName = titleToRouteMap[title];
    if (routeName) {
      navigation.navigate(NAVIGATION_ROUTES.MAIN[routeName]);
    } else {
      console.error(`No route found for title: ${title}`);
    }
  };

  const handlePress = () => {
    navigation.navigate(NAVIGATION_ROUTES.MAIN.CHAT);
  };

  return (
    <Wrapper>
      <HeaderBanner />
      <ScrollView bounces={false} horizontal={false}>
        <ImageBackground
          source={IMAGES.bg_logo_low}
          resizeMode="contain"
          style={styles.backgroundImage}>
          <FullView>
            <Title
              title={'Choose Your Area'}
              titlestyle={styles.signInTitleText}
            />
            <CenterView>
              <View style={styles.boxcontainer}>
                {HomeMenus.map((menu, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.box}
                    onPress={() => handlePageChange(menu.title)}>
                    <FontAwesomeWrapper
                      icon={menu.icon}
                      size={28}
                      color={Colors.offWhiteLight}
                    />
                    <Text style={styles.text}>{menu.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </CenterView>
          </FullView>
        </ImageBackground>
      </ScrollView>

      <TouchableOpacity
        onPress={handlePress}
        style={[styles.contactButton, {left: position.x, top: position.y}]}>
        <Animated.View style={[styles.contactText, {opacity: fadeAnim}]}>
          <Image source={IMAGES.chat_gif} style={styles.gifImage} />
          <Text style={styles.contactText}>Ask AI</Text>
        </Animated.View>
      </TouchableOpacity>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    marginTop: normalizeHeight(100),
  },
  signInTitleText: {
    ...typography.h3,
    fontSize: normalizeFont(22),
    color: Colors.cosmos_blue,
  },
  boxcontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: normalizeHeight(20),
  },
  box: {
    width: normalizeWithScale(120),
    height: normalizeWithScale(120),
    justifyContent: 'center',
    alignItems: 'center',
    margin: normalizeWithScale(10),
    borderRadius: normalizeWithScale(10),
    backgroundColor: Colors.cosmos_blue,
  },
  text: {
    fontSize: normalizeFont(14),
    color: Colors.offWhiteLight,
    marginTop: normalizeHeight(5),
    textAlign: 'center',
    fontFamily: FontType.Outfit.Regular,
  },
  contactButton: {
    position: 'absolute',
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    backgroundColor: Colors.buttonGradientDarkBlue,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    borderRadius: 10,
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: normalizeHeight(20),
  },
  contactText: {
    color: '#fff',
    fontSize: normalizeFont(12),
    fontFamily: FontType.Outfit.Light,
    marginTop: normalizeHeight(2),
  },
  gifImage: {
    width: BUTTON_SIZE - 25,
    height: BUTTON_SIZE - 25,
  },
});
