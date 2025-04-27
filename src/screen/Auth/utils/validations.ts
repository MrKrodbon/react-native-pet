import * as Yup from 'yup';

export const RegistrationSchema = () =>
  Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .matches(new RegExp(/^.{8,100}$/))
      .required('Password is required'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Password must match',
    ),
  });
