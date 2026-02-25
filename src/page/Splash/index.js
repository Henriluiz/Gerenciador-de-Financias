import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Text, View, Pressable, ImageBackground, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';



export default function Splash() {
  const navigation = useNavigation();

  const telaLogin = () => {
    // Coloque aqui sua lógica (ex: API fetch)
    navigation.replace('Login');
  };

  const verificarCadastro = async() => {
    try {
      const cadastro = await AsyncStorage.getItem("@usuario");
      if (cadastro !== null){
        const obj = JSON.parse(user)
        console.log(user)
      }
      }catch(error){
        console.log("O erro seguinte é", error)
    }
  }

  const addLogin = async() => {
    const usuario = {
      user: email,
      password: senha,
    }
    await AsyncStorage.setItem("@usuario", JSON.stringify(usuario))
    console.log("Salvo com Sucesso!")

  }

  useEffect(() => {
    setTimeout(() => {
      telaLogin();
    }, 3000);
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