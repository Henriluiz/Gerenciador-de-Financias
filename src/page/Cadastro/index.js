import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable, ImageBackground, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

export default function Cadastro() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
        {/* <Pressable onPress={}></Pressable> */}
        <Text>Hello World</Text>
      <StatusBar style="auto" />
    </View>
  );
}