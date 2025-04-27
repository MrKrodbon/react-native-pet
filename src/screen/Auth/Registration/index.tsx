import React, {useEffect, useState} from 'react';
import AuthLayout from '../../../components/AuthLayout';
import AuthHeader from '../../../components/AuthHeader';
import {Formik, FormikHelpers, FormikValues} from 'formik';
import {View} from 'react-native';
import Input from '../../../common/components/Input';
import DefaultButton from '../../../common/components/DefaultButton';
import styles from '../styles';
import {RegistrationSchema} from '../utils/validations';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/core';
import {ScreenNames} from '../../../constants/screenNames';

interface ITouched {
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
}

export default function Registration() {
  const [touched, setTouched] = useState<ITouched>({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const navigation = useNavigation();

  const registrationUser = async (
    email: string,
    password: string,
    formikHelpers: FormikHelpers<FormikValues>,
  ) => {
    try {
      const result = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      if (result.user) {
        navigation.navigate(ScreenNames.HOME_PAGE);
      }
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        formikHelpers.setErrors({email: 'email already in use'});
      }
      console.dir(error);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {});
    return subscriber;
  }, []);

  return (
    <AuthLayout>
      <AuthHeader activeTab={'registration'} />
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={(value, formikHelpers) => {
          registrationUser(value.email, value.password, formikHelpers);
        }}
        validationSchema={RegistrationSchema()}>
        {({
          values,
          setFieldValue,
          handleSubmit,
          isValid,
          errors,
        }: FormikValues) => (
          <>
            <View style={styles.formContainer}>
              <Input
                onFocus={() =>
                  setTouched(prevState => ({...prevState, email: true}))
                }
                value={values.email}
                onChangeText={value => {
                  setFieldValue('email', value);
                }}
                placeholder={'Email'}
                error={touched.email && errors.email}
              />
              <Input
                onFocus={() =>
                  setTouched(prevState => ({...prevState, password: true}))
                }
                value={values.password}
                onChangeText={value => {
                  setFieldValue('password', value);
                }}
                placeholder={'Password'}
                error={touched.password && errors.password}
              />
              <Input
                onFocus={() =>
                  setTouched(prevState => ({
                    ...prevState,
                    confirmPassword: true,
                  }))
                }
                value={values.confirmPassword}
                onChangeText={value => {
                  setFieldValue('confirmPassword', value);
                }}
                placeholder={'Confirm Password'}
                error={touched.confirmPassword && errors.confirmPassword}
              />
            </View>
            <DefaultButton
              disabled={
                !isValid ||
                !values.email ||
                !values.password ||
                !values.confirmPassword
              }
              onPress={handleSubmit}
              text={'Зарееструватись'}
            />
          </>
        )}
      </Formik>
    </AuthLayout>
  );
}
