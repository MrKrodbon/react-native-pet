import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {Text} from 'react-native-svg';

export default function Home() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <Text>Home Page</Text>
    </TouchableOpacity>
  );
}
