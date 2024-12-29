import { IMAGES } from '@/assests/images';
import CenterView from '@/components/shared/CenterView';
import FullView from '@/components/shared/FullView';
import HeaderBanner from '@/components/shared/HeaderBanner';
import Title from '@/components/title';
import { HomeMenus, titleToRouteMap } from '@/constants';
import Colors from '@/constants/color';
import { NAVIGATION_ROUTES } from '@/constants/screenName';
import Wrapper from '@/theme/Wrapper';
import { GenericNavigationType } from '@/types/navigation';
import { typography } from '@/utils/fontUtil';
import { normalizeFont, normalizeHeight, normalizeWithScale } from '@/utils/styleUtil';
import FontAwesomeWrapper from '@/wrapper/fontAwesomeWrapper';
import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Home({navigation}: GenericNavigationType) {


  const handlePageChange = (title: string) => {
    const routeName = titleToRouteMap[title];
    if (routeName) {
      navigation.navigate(NAVIGATION_ROUTES.MAIN[routeName]);
    } else {
      console.error(`No route found for title: ${title}`);
    }
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
                      color={Colors.buttonGradientDarkBlue}
                    />
                    <Text style={styles.text}>{menu.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </CenterView>
          </FullView>
        </ImageBackground>
      </ScrollView>
    </Wrapper>
  );
}


const styles = StyleSheet.create({
  signInTitleText: {
    ...typography.h1,
    marginTop: normalizeHeight(40),
  },

  box: {
    backgroundColor: 'lightgrey',
    width: '43%',
    height: '60%',
    borderRadius: 10, // Rounded square
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, // Shadow for Android
  },
  text: {
    ...typography.regular,
    marginTop: 10,
    color: Colors.buttonGradientDarkBlue,
    fontSize: normalizeFont(20),
    lineHeight: normalizeHeight(20),
  },
  boxcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: normalizeHeight(60),
    padding: normalizeWithScale(10),
  },
  backgroundImage: {
    justifyContent: 'center', // Aligns content vertically
    alignItems: 'center', // Aligns content horizontally
    width: '100%',
    height: '100%',
  },
});