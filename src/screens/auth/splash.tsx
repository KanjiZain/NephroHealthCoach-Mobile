import {IMAGES} from '@/assests/images';
import CenterView from '@/components/shared/CenterView';
import {NAVIGATION_ROUTES} from '@/constants/screenName';
import Wrapper from '@/theme/Wrapper';
import {GenericNavigationType} from '@/types/navigation';
import {normalizeHeight, normalizeWidth} from '@/utils/styleUtil';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useRef} from 'react';
import {Image, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';

const SplashScreen = ({navigation}: GenericNavigationType) => {
  const logoRef = useRef<any>(null);

  useFocusEffect(
    useCallback(() => {
      if (logoRef.current) {
        logoRef.current.fadeIn(5000);
      }
    }, []),
  );

  const handleAnimationEnd = () => {
    setTimeout(() => navigation.navigate(NAVIGATION_ROUTES.AUTH.SIGNIN), 3000);
  };

  return (
    <Wrapper>
      <CenterView>
        <CenterView>
          <Animatable.View
            ref={logoRef}
            animation="fadeIn"
            duration={2000}
            onAnimationEnd={handleAnimationEnd}>
            <Image source={IMAGES.bg_logo} style={styles.image} />
          </Animatable.View>
        </CenterView>
      </CenterView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  image: {
    width: normalizeWidth(250),
    height: normalizeHeight(250),
  },
});

export default SplashScreen;
