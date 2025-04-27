import {View} from 'react-native';
import React, {useState} from 'react';
import styles from '../styles';
import AuthLayout from '../../../components/AuthLayout';

import AuthHeader from '../../../components/AuthHeader';
import Input from '../../../common/components/Input';
import DefaultButton from '../../../common/components/DefaultButton';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/core';
import {ScreenNames} from '../../../constants/screenNames';

interface IInputValue {
  email: string;
  password: string;
  errorEmail: null | string;
  errorPassword: null | string;
}

export default function LoginPage() {
  const [inputValues, setInputValues] = useState<IInputValue>({
    email: '',
    password: '',
    errorEmail: null,
    errorPassword: null,
  });

  const navigation = useNavigation();

  const loginBtnDisabled = Boolean(
    inputValues.errorEmail ||
      inputValues.errorPassword ||
      !inputValues.email ||
      !inputValues.password,
  );
  const handleChangeInput = (
    key: 'email' | 'password' | 'errorEmail' | 'errorPassword',
    value: string | null,
  ) => {
    setInputValues(prevState => ({...prevState, [key]: value}));
  };
  const checkEmail = () => {
    const emailValidator = new RegExp(
      '^([a-z0-9._%-]+@[a-z0-9.-]+.[a-z]{2,6})*$',
    );
    if (!emailValidator.test(inputValues.email)) {
      handleChangeInput('errorEmail', 'Not valid email');
    } else {
      handleChangeInput('errorEmail', null);
    }
  };
  const checkPassword = (text: string) => {
    if (text.length < 8) {
      handleChangeInput(
        'errorPassword',
        'Password must be more then 8 symbols ',
      );
    } else {
      handleChangeInput('errorPassword', null);
    }
  };

  const onLogin = async (email: string, password: string) => {
    try {
      const result = await auth().signInWithEmailAndPassword(email, password);
      if (result.user) {
        navigation.navigate(ScreenNames.HOME_PAGE);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthLayout>
      <AuthHeader activeTab={'login'} />
      <View style={styles.formContainer}>
        <Input
          onBlur={checkEmail}
          value={inputValues.email}
          onChangeText={text => handleChangeInput('email', text)}
          error={inputValues.errorEmail}
          placeholder={'Email'}
        />
        <Input
          value={inputValues.password}
          onChangeText={text => {
            handleChangeInput('password', text);
            checkPassword(text);
          }}
          error={inputValues.errorPassword}
          placeholder={'Password'}
          secureTextEntry
        />
      </View>
      <DefaultButton
        onPress={() => {
          onLogin(inputValues.email, inputValues.password);
        }}
        disabled={loginBtnDisabled}
        text={'Увійти'}
      />
    </AuthLayout>
  );
}
