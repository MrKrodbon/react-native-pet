import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ScreenNames} from '../../constants/screenNames';
import Registration from '../../screen/Auth/Registration';
import LoginPage from '../../screen/Auth/Login';
import {LoggedOutStackType} from '../types';

const Stack = createNativeStackNavigator<LoggedOutStackType>();

export default function LoggedOutStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ScreenNames.LOGIN_PAGE} component={LoginPage} />
      <Stack.Screen
        name={ScreenNames.REGISTRATION_PAGE}
        component={Registration}
      />
    </Stack.Navigator>
  );
}
