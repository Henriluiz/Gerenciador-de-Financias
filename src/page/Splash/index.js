import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Text, View, Pressable, ImageBackground, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Splash() {
  const navigation = useNavigation();

  const verificarLogin = async() => {
    try {
    const login = await AsyncStorage.getItem("@login");
    if (login !== null){
      setTimeout(() => {
        navigation.replace("Menu");
      }, 3000);
    } else {
      setTimeout(() => {
        navigation.replace("Login");
      }, 3000);
    }
    }catch(error){
      console.log("Splash/verificarLogin - O erro seguinte é", error)
    }
  }

  useEffect(() => { 
    verificarLogin();
  }, []);

  return (
    <View style={styles.container}>
        <Animatable.Image animation={"bounceIn"} duration={3000} source={require("./icon/picpay_com_fundo.png")}
            style={styles.ima}>
        </Animatable.Image>
      <StatusBar style="auto" />
    </View>
  );
}