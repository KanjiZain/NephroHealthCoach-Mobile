import CenterView from '@/components/shared/CenterView';
import FullView from '@/components/shared/FullView';
import Wrapper from '@/theme/Wrapper';
import {GenericNavigationType} from '@/types/navigation';
import {
  normalizeFont,
  normalizeHeight,
  normalizeWidth,
  normalizeWithScale,
} from '@/utils/styleUtil';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {FontType, typography} from '@/utils/fontUtil';
import Colors from '@/constants/color';
import InputView from '@/components/shared/InputView';
import FontAwesomeWrapper from '@/wrapper/fontAwesomeWrapper';
import {faEnvelope, faLock, faPhone} from '@fortawesome/free-solid-svg-icons';
import CustomInput from '@/components/input';
import {Theme} from '@/theme';
import CustomButton from '@/components/button';
import {PASSWORD_REGEX, EMAIL_REGEX, NUMERIC_REGEX, NOT_EMPTY_Regex} from '@/helpers';
import _ from 'lodash';
import { NAVIGATION_ROUTES } from '@/constants/screenName';
import Header from '@/components/shared/Header';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { GenderListWithLabel } from '@/constants';
import Select from '@/components/shared/Selector';
import Spacer from '@/components/shared';

export default function Signup({navigation}: GenericNavigationType) {
  const [Email, setEmail] = React.useState<string>('');
  const [Password, setPassword] = React.useState<string>('');
  const [phoneNumber, setphoneNumber] = React.useState('');
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [gender, setGender] = React.useState<any>('');

  const checkIsFieldValid = React.useCallback(() => {
    const isInputInvalid =
      _.isEmpty(Email) ||
      !EMAIL_REGEX.test(Email) ||
      _.isEmpty(Password) ||
      !PASSWORD_REGEX.test(Password) ||
      _.isEmpty(firstName) ||
      !NOT_EMPTY_Regex.test(firstName);
    _.isEmpty(lastName) || !NOT_EMPTY_Regex.test(lastName);
    !NUMERIC_REGEX.test(phoneNumber);
    _.isEmpty(phoneNumber) || !NOT_EMPTY_Regex.test(phoneNumber);

    const genderEmpty = [gender].some(value => {
      return !value || (typeof value === 'string' && value.trim() === '');
    });

    return !isInputInvalid && !genderEmpty;
  }, [Email, Password, phoneNumber, firstName, lastName, gender]);

  const isFieldValid = checkIsFieldValid();

  const handleSignin = () => {
    navigation.navigate(NAVIGATION_ROUTES.AUTH.SIGNUP)
  };

   const handleSelectGender = (selectedOption: string) => {
     setGender(selectedOption);
   };


  return (
    <Wrapper>
      <SafeAreaView style={styles.mainContainer}>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <CenterView>
            <FullView containerStyle={{gap: normalizeHeight(10)}}>
              <Header title="Register to Join us" />

              <FullView containerStyle={{padding: 0}}>
                <InputView>
                  <CustomInput
                    placeholder={'Enter First Name'}
                    containerStyle={Theme.Input.primary}
                    onChange={setFirstName}
                    secureTextEntry={false}
                    value={firstName}
                    validate={{
                      regex: NOT_EMPTY_Regex,
                      errorMessage: 'Please Fill the Feild',
                    }}
                    renderInputLeft={error => (
                      <FontAwesomeWrapper
                        icon={faUser}
                        color={error ? Colors.red : Colors.white}
                        size={normalizeFont(21)}
                      />
                    )}
                  />
                </InputView>
                <InputView>
                  <CustomInput
                    placeholder={'Enter Last Name'}
                    containerStyle={Theme.Input.primary}
                    onChange={setLastName}
                    secureTextEntry={false}
                    value={lastName}
                    validate={{
                      regex: NOT_EMPTY_Regex,
                      errorMessage: 'Please Fill the Feild',
                    }}
                    renderInputLeft={error => (
                      <FontAwesomeWrapper
                        icon={faUser}
                        color={error ? Colors.red : Colors.white}
                        size={normalizeFont(21)}
                      />
                    )}
                  />
                </InputView>

                <InputView>
                  <CustomInput
                    placeholder={'Enter Phone Number'}
                    containerStyle={Theme.Input.primary}
                    value={phoneNumber}
                    isNumeric={true}
                    onChange={setphoneNumber}
                    validate={{
                      regex: NUMERIC_REGEX,
                      errorMessage: 'Please Enter Valid Phone Number',
                    }}
                    renderInputLeft={error => (
                      <FontAwesomeWrapper
                        icon={faPhone}
                        color={error ? Colors.red : Colors.white}
                        size={normalizeFont(21)}
                      />
                    )}
                  />
                </InputView>
                <InputView>
                  <CustomInput
                    placeholder={'Enter Valid Email'}
                    containerStyle={Theme.Input.primary}
                    onChange={setEmail}
                    secureTextEntry={false}
                    value={Email}
                    validate={{
                      regex: EMAIL_REGEX,
                      errorMessage: 'Enter Valid Email',
                    }}
                    renderInputLeft={error => (
                      <FontAwesomeWrapper
                        icon={faEnvelope}
                        color={error ? Colors.red : Colors.white}
                        size={normalizeFont(21)}
                      />
                    )}
                  />
                </InputView>
                <InputView>
                  <CustomInput
                    placeholder={'Enter Valid Password'}
                    containerStyle={Theme.Input.primary}
                    onChange={setPassword}
                    secureTextEntry={true}
                    value={Password}
                    validate={{
                      regex: PASSWORD_REGEX,
                      errorMessage: 'Enter Password of 6 Length',
                    }}
                    renderInputLeft={error => (
                      <FontAwesomeWrapper
                        icon={faLock}
                        color={error ? Colors.red : Colors.white}
                        size={normalizeFont(21)}
                      />
                    )}
                  />
                </InputView>
                <InputView>
                  <CenterView containerStyle={styles.genderContainer}>
                    <View style={styles.gender}>
                      <Select
                        options={GenderListWithLabel}
                        onSelect={handleSelectGender}
                        placeholder={'Select Gender'}
                        value={gender}
                        isEditable={true}
                      />
                    </View>
                  </CenterView>
                </InputView>
              </FullView>

              <SafeAreaView style={styles.buttonContainer}>
                <CustomButton
                  title={'Login'}
                  buttonstyle={Theme.Button.login_button}
                  onPress={() => handleSignin()}
                  fontstyle={Theme.Title.login_button_title}
                  // loading={isLoading}
                  disabled={!isFieldValid}
                />
                <Spacer size={normalizeHeight(75)} />
              </SafeAreaView>
            </FullView>
          </CenterView>
        </ScrollView>
      </SafeAreaView>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  background: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlayIcon: {
    position: 'absolute',
    top: normalizeHeight(40),
    left: normalizeWidth(20),
  },
  forogotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  imageContainer: {
    height: Platform.OS === 'ios' ? normalizeHeight(250) : normalizeHeight(350),
    width: '100%',
  },
  signInTitleText: {
    ...typography.h1,
  },
  companyLogoText: {
    ...typography.h1,
    color: Colors.cosmos_blue,
  },
  forgotPasswordText: {
    ...typography.body2,
    fontFamily: FontType.Outfit.Light,
  },
  registerRedirectionText: {
    ...typography.body2,
    fontFamily: FontType.Outfit.Light,
    color: Colors.white,
    marginTop: normalizeHeight(5),
    marginBottom: normalizeHeight(5),
  },
  registerRedirectionTextBold: {
    ...typography.body2,
    fontFamily: FontType.Outfit.Bold,
    color: Colors.white,
    marginTop: normalizeHeight(5),
    marginBottom: normalizeHeight(5),
  },
  bottomViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    marginLeft: normalizeHeight(70),
  },
  bottomSheetView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: normalizeHeight(13),
    flexDirection: 'row',
  },

  bottomSheetContainer: {
    backgroundColor: Colors.blue,
    borderTopLeftRadius: normalizeWithScale(35),
    borderTopRightRadius: normalizeWithScale(35),
  },
  bottomSheetIcons: {
    marginHorizontal: normalizeHeight(13),
    width: normalizeWidth(30),
    height: normalizeHeight(30),
  },

  toggleContainer: {
    display: 'flex',
    width: normalizeWidth(50),
    height: normalizeHeight(30),
    borderRadius: normalizeWithScale(20),
    backgroundColor: Colors.flickering_gold,
    marginHorizontal: normalizeHeight(10),
    justifyContent: 'center',
    padding: normalizeWithScale(5),
  },
  toggleBackground: {
    flex: 1,
    borderRadius: normalizeWithScale(20),
    backgroundColor: Colors.flickering_gold,
  },
  toggleButton: {
    width: normalizeWidth(20),
    height: normalizeHeight(20),
    borderRadius: normalizeWithScale(100),
    backgroundColor: Colors.white,
  },
  languageText: {
    color: Colors.black,
    fontSize: normalizeFont(12),
  },
  toggleWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    top: normalizeHeight(30),
    right: normalizeWidth(10),
  },
  container1: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginLeft: 5,
  },
  fingerprintButtonView: {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'center',
    gap: normalizeWidth(5),
  },
  biometricsButton: {
    padding: normalizeWithScale(5),
    borderRadius: normalizeFont(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  biometricsIcon: {
    width: normalizeWidth(50),
    height: normalizeHeight(50),
    tintColor: Colors.white,
  },
  biometricsIconDisabled: {
    width: normalizeWidth(50),
    height: normalizeHeight(50),
    tintColor: Colors.grey,
  },
  headertitle: {
    color: Colors.white,
  },
  gender: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  genderContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    width: '100%',
    gap: normalizeWidth(20),
  },
});
