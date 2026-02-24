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
            <Pressable onPress={() => closeProfile()}>
              <SimpleLineIcons name="user" size={24} color="#FFF" />
            </Pressable>
            <TextInput 
                style={styles.buscar}
                placeholder='Buscar'
            />
            <Text style={styles.text}>Olá, {nome || "Luiz Henrique"}</Text>
        </View>
        <View style={styles.content}>
            <View style={styles.contentSaldo}>
              <View style={styles.itens}>
                  <Text style={{color: "#FFF", fontSize: 18}}>
                    Saldo em conta
                  </Text>
                    <Pressable onPress={() => setVisivel(v => !v)} style={{flexDirection: "row", gap: 5, alignItems: "center"}} >
                      <Text style={{color: "#FFF", fontSize: 25, textAlign: "center", fontWeight: "bold"}}>
                          {visivel ? formatar(saldo) : <Text>R$ •••••</Text>}
                      </Text>
                    </Pressable>
              </View>
              <AntDesign name={visivel ? "eye-invisible" : "eye"} size={24} color="#FFF" />
            </View>
            <Pressable
              style={styles.botton}> 
              <Text>Guardar</Text>
            </Pressable>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1F8F78",
    paddingTop: statusBarHeight, // Isso fará o padding de acordo com o tamanho do StatusBar
    justifyContent: "flex-end",
    alignItems: "center",
  },

  Contheader: {
    width: wp("90%"),
    backgroundColor: "#1F8F78",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: hp("4%"),
  },

  buscar: {
    color: "#FFF",
    width: wp("25%")
  },

  content: {
    flexDirection: "column",
    backgroundColor: "#177261",
    width: wp("80%"),
    height: hp("17%"),
    padding: wp("5%"),
    borderRadius: 25,
    marginBottom: hp("2%"),
  },

  contentSaldo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  itens: {
    paddingTop: 5,
    paddingBottom: 20,
  },

  botton: {
    width: wp("70%"),
    backgroundColor: "#FFF",
    textAlign: "center",
    alignItems: "center",
    borderRadius: 15,
    paddingVertical: hp("1%")
  },

  text: {
    color: "#FFF",
    fontSize: 15,
  },

});