import CenterView from '@/components/shared/CenterView';
import FullView from '@/components/shared/FullView';
import Title from '@/components/title';
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
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {FontType, typography} from '@/utils/fontUtil';
import Colors from '@/constants/color';
import InputView from '@/components/shared/InputView';
import FontAwesomeWrapper from '@/wrapper/fontAwesomeWrapper';
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';
import CustomInput from '@/components/input';
import {Theme} from '@/theme';
import CustomButton from '@/components/button';
import {PASSWORD_REGEX, EMAIL_REGEX} from '@/helpers';
import _ from 'lodash';
import * as Animatable from 'react-native-animatable';
import {IMAGES} from '@/assests/images';
import {NAVIGATION_ROUTES} from '@/constants/screenName';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {IStateReducers} from '@/store/types';
import {loginAction} from '@/store/actions';
import Toast from 'react-native-toast-message';
import {ToastTypes} from '@/enums';
import {useTypedDispatch} from '@/store';

export default function SignIn({navigation}: GenericNavigationType) {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const {email: emailRedux} = useSelector(
    (state: IStateReducers) => state.auth,
  );
  const dispatch = useTypedDispatch();

  const checkIsFieldValid = React.useCallback(() => {
    const isInputInvalid =
      _.isEmpty(email) ||
      !EMAIL_REGEX.test(email) ||
      _.isEmpty(password) ||
      !PASSWORD_REGEX.test(password);

    return !isInputInvalid;
  }, [email, password]);

  const isFieldValid = checkIsFieldValid();

  useFocusEffect(
    React.useCallback(() => {
      if (emailRedux && emailRedux !== '') {
        setEmail(emailRedux);
      }
    }, [emailRedux]),
  );

  const handleSubmit = async () => {
    let loginData = {
      email,
      password,
    };
    let response = await dispatch(loginAction(loginData));
    if (response.success) {
     
    } else {
      Toast.show({
        type: ToastTypes.ERROR,
        text1: response?.error,
      });
    }
  };

  const handleSignup = () => {
    navigation.navigate(NAVIGATION_ROUTES.AUTH.SIGNUP);
  };

  return (
    <Wrapper>
      <SafeAreaView style={styles.mainContainer}>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <SafeAreaView style={styles.imageContainer}>
            <Animatable.Image
              source={IMAGES.bg_logo}
              style={styles.background}
              resizeMode="cover"
              animation="fadeIn"
              duration={3000}
            />
          </SafeAreaView>
          <CenterView>
            <FullView containerStyle={{gap: normalizeHeight(18)}}>
              <Title
                title={'Log In To '}
                titlestyle={styles.signInTitleText}
                spanstyle={styles.signInTitleText}
                spantext={'Your Account'}
              />
              <FullView containerStyle={{padding: 0}}>
                <InputView>
                  <CustomInput
                    placeholder={'Enter Valid Email'}
                    containerStyle={Theme.Input.primary}
                    onChange={setEmail}
                    secureTextEntry={false}
                    value={email}
                    validate={{
                      regex: EMAIL_REGEX,
                      errorMessage: 'Enter Valid Email',
                    }}
                    renderInputLeft={error => (
                      <FontAwesomeWrapper
                        icon={faEnvelope}
                        color={error ? Colors.red : Colors.white}
                        size={normalizeFont(18)}
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
                    value={password}
                    validate={{
                      regex: PASSWORD_REGEX,
                      errorMessage: 'Enter Password of 6 Length',
                    }}
                    renderInputLeft={error => (
                      <FontAwesomeWrapper
                        icon={faLock}
                        color={error ? Colors.red : Colors.white}
                        size={normalizeFont(18)}
                      />
                    )}
                  />
                </InputView>
              </FullView>

              <SafeAreaView style={styles.buttonContainer}>
                <CustomButton
                  title={'Login'}
                  buttonstyle={Theme.Button.login_button}
                  onPress={() => handleSubmit()}
                  fontstyle={Theme.Title.login_button_title}
                  // loading={isLoading}
                  disabled={!isFieldValid}
                />
              </SafeAreaView>

              <View style={styles.bottomViewContainer}>
                <Title
                  title={'Doesn’t have an account? '}
                  titlestyle={styles.registerRedirectionText}
                />
                <TouchableOpacity onPress={handleSignup}>
                  <Title
                    title={'Register now'}
                    titlestyle={styles.registerRedirectionTextBold}
                  />
                </TouchableOpacity>
              </View>
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
});
