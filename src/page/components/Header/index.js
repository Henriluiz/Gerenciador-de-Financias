import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable, ImageBackground, Image, TextInput, StyleSheet, useWindowDimensions} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; // Usa isso, no lugar de pixels ex: wp("10%") e hp("10%")
import { useRoute } from "@react-navigation/native";



import {} from "@expo/vector-icons"

import AntDesign from '@expo/vector-icons/AntDesign'; // Visualizar saldo <AntDesign name="eye" size={24} color="black" />     /  Ocultar saldo <AntDesign name="eye-invisible" size={24} color="black" />
// <AntDesign name="send" size={24} color="black" /> - Enviar 
//<AntDesign name="setting" size={24} color="black" />
// <AntDesign name="sun" size={24} color="black" /> modo claro

import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Cadastro from '../../Cadastro';
//  User 

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 15 : 22;
// Uma condição, se não houve valor em currentHeight, ele usa o 22 que deixei ao meu gosto predefinido


export default function Header( {saldo, closeProfile} ) {
  const navigation = useNavigation();
  const [ativo, setAtivo] = useState(false);
  const [visivel, setVisivel] = useState(false);
  
  const route = useRoute();
  const nome = route.params?.nome
  function handlePress() {  
    // sua ação
    console.log("Executou função");

    // troca o estado
    setAtivo(prev => !prev);
  }

  function formatar(valor) {
    return Number(saldo ?? 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <View style={styles.container}>
        <View style={styles.Contheader}>
            <Text style={styles.text}>Olá, {nome || "Luiz Henrique"}</Text>
            <Pressable onPress={() => closeProfile()}>
              <SimpleLineIcons name="user" size={24} color="#FFF" />
            </Pressable>
        </View>
        <View style={styles.content}>
            <View style={styles.itens}>
                <Text style={{color: "#FFF", fontSize: 15, textAlign: "center"}}>
                    Saldo Picpay
                </Text>
                  <Pressable onPress={() => setVisivel(v => !v)} style={{flexDirection: "row", gap: 5, alignItems: "center"}} >
                    <Text style={{color: "#FFF", fontSize: 25, textAlign: "center"}}>
                        {visivel ? formatar(saldo) : <Text>R$ •••••</Text>}
                    </Text>
                    <AntDesign name={visivel ? "eye" : "eye-invisible"} size={24} color="#FFF" />
                  </Pressable>
              </View>
          </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#21C25E",
    paddingTop: statusBarHeight,
    height: 150,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  Contheader: {
    width: "100%",
    backgroundColor: "#21C25E",
    paddingInline: "5%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    
  },

  content: {
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "black",
  },

  itens: {
    paddingTop: 5,
    paddingBottom: 20,
    backgroundColor: "#21C25E",
  },


  text: {
    color: "#FFF",
    fontSize: 15,
  },

});