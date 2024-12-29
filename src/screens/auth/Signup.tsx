import CenterView from '@/components/shared/CenterView';
import FullView from '@/components/shared/FullView';
import Wrapper from '@/theme/Wrapper';
import {GenericNavigationType} from '@/types/navigation';
import {
  normalizeFont,
  normalizeHeight,
  normalizeWidth,
} from '@/utils/styleUtil';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {typography} from '@/utils/fontUtil';
import Colors from '@/constants/color';
import InputView from '@/components/shared/InputView';
import FontAwesomeWrapper from '@/wrapper/fontAwesomeWrapper';
import {faEnvelope, faLock, faPhone} from '@fortawesome/free-solid-svg-icons';
import CustomInput from '@/components/input';
import {Theme} from '@/theme';
import CustomButton from '@/components/button';
import {
  PASSWORD_REGEX,
  EMAIL_REGEX,
  NUMERIC_REGEX,
  NOT_EMPTY_Regex,
} from '@/helpers';
import _ from 'lodash';
import {NAVIGATION_ROUTES} from '@/constants/screenName';
import {faUser} from '@fortawesome/free-regular-svg-icons';
import {GenderListWithLabel} from '@/constants';
import Select from '@/components/shared/Selector';
import Spacer from '@/components/shared';
import {useTypedDispatch} from '@/store';
import {signUpAction} from '@/store/actions';
import Toast from 'react-native-toast-message';
import {ToastTypes} from '@/enums';
import {useSelector} from 'react-redux';
import {IStateReducers} from '@/store/types';
import Header from '@/components/shared/Header';

export default function Signup({navigation}: GenericNavigationType) {
  const [email, setEmail] = React.useState<string>('');
  const [Password, setPassword] = React.useState<string>('');
  const [phoneNumber, setphoneNumber] = React.useState('');
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [gender, setGender] = React.useState<any>('');
  const dispatch = useTypedDispatch();
  const {isLoading} = useSelector((state: IStateReducers) => state.auth);

  const checkIsFieldValid = React.useCallback(() => {
    const isInputInvalid =
      _.isEmpty(email) ||
      !EMAIL_REGEX.test(email) ||
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
  }, [email, Password, phoneNumber, firstName, lastName, gender]);

  const isFieldValid = checkIsFieldValid();

  const handleSelectGender = (selectedOption: string) => {
    setGender(selectedOption);
  };

  const handleSubmit = async () => {
    let signUpData = {
      email,
      mobile: phoneNumber,
      firstName,
      lastName,
      gender,
      password: Password,
    };
    let response = await dispatch(signUpAction(signUpData));
    if (response.success) {
      Toast.show({
        type: ToastTypes.SUCCESS,
        text1: response?.message,
      });
      setTimeout(() => {
        navigation.navigate(NAVIGATION_ROUTES.AUTH.SIGNIN);
      }, 2000);
    } else {
      Toast.show({
        type: ToastTypes.ERROR,
        text1: response?.error,
      });
    }
  };

  return (
    <Wrapper>
      <SafeAreaView style={styles.mainContainer}>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <CenterView>
            <FullView containerStyle={{gap: normalizeHeight(10)}}>
              <Header title="Register To Join Us" />
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
                        size={normalizeFont(18)}
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
                        size={normalizeFont(18)}
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
                    value={Password}
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
                        size={normalizeFont(18)}
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
                  title={'Signup'}
                  buttonstyle={Theme.Button.login_button}
                  onPress={() => handleSubmit()}
                  fontstyle={Theme.Title.login_button_title}
                  loading={isLoading}
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
  signInTitleText: {
    ...typography.h3,
    marginTop: normalizeHeight(20),
  },
  container1: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
    width: '100%',
    marginVertical: normalizeHeight(20),
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginLeft: 5,
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
