import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import styles from '../../screen/Auth/styles';

export interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({children}: AuthLayoutProps) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {/* <KeyboardAvoidingView
        style={{flex: 1}}
        keyboardVerticalOffset={Platform.select({android: 20, ios: 90})}
        behavior={
          Platform.OS === 'ios' ? 'padding' : 'height'
        }></KeyboardAvoidingView> */}
      <View style={[styles.mainWrapper]}>{children}</View>
    </TouchableWithoutFeedback>
  );
}
