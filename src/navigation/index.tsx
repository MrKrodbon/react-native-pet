import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ScreenNames} from '../constants/screenNames';
import {RootStackNavigation} from './types';
import LoggedInStack from './LoggedInStack';
import LoggedOutStack from './LoggedOutStack';

const Stack = createNativeStackNavigator<RootStackNavigation>();

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ScreenNames.LOGGED_IN_STACK}>
        <Stack.Screen
          name={ScreenNames.LOGGED_IN_STACK}
          component={LoggedInStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ScreenNames.LOGGED_OUT_STACK}
          component={LoggedOutStack}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
