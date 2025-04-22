import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import ViewPassIcon from '../../../assets/icons/ViewPassIcon';
import {HidePassIcon} from '../../../assets/icons';

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

  const [isPassHidden, setIsPassHidden] = useState(true);

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
  const checkPassword = text => {
    if (text.length < 8) {
      handleChangeInput(
        'errorPassword',
        'Password must be more then 8 symbols ',
      );
    } else {
      handleChangeInput('errorPassword', null);
    }
  };

  const onHidePasswordClick = () => {};
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        keyboardVerticalOffset={Platform.select({android: 20, ios: 90})}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={[styles.mainWrapper]}>
          <View style={[styles.titleContainer]}>
            <Text style={styles.title}>Раді тебе вітати!</Text>
            <Text style={styles.welcomeText}>
              Кожен пухнастик заслуговує на дбайливих господарів.Ми допоможемо
              тобі знайти друга.
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.loginBtn}>
              <Text style={styles.authText}>Вхід</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registrationBtn}>
              <Text style={styles.authText}>Реєстрація</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder={'Email'}
                style={styles.input}
                placeholderTextColor={'#838383'}
                onBlur={() => {
                  checkEmail();
                }}
                value={inputValues.email}
                onChangeText={text => handleChangeInput('email', text)}
              />
            </View>
            {inputValues.errorEmail && <Text>{inputValues.errorEmail}</Text>}
            <View style={styles.inputContainer}>
              <TextInput
                placeholder={'Password'}
                style={styles.input}
                placeholderTextColor={'#838383'}
                value={inputValues.password}
                onChangeText={text => {
                  handleChangeInput('password', text);
                  checkPassword(text);
                }}
                secureTextEntry={isPassHidden}
              />
              <TouchableOpacity
                onPress={() => {
                  setIsPassHidden(!isPassHidden);
                }}
                hitSlop={{
                  top: 15,
                  bottom: 15,
                  right: 15,
                  left: 15,
                }}>
                {!isPassHidden ? <ViewPassIcon /> : <HidePassIcon />}
              </TouchableOpacity>
            </View>

            {inputValues.errorPassword && (
              <Text>{inputValues.errorPassword}</Text>
            )}
          </View>
          <TouchableOpacity
            style={[
              styles.loginBtnContainer,
              loginBtnDisabled && {opacity: 0.5},
            ]}
            disabled={loginBtnDisabled}>
            <Text style={styles.loginText}>Увійти</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
