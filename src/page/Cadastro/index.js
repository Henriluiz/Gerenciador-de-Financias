import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable, ImageBackground, Image, TextInput, Alert} from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cadastro() {
  const navigation = useNavigation();

  const [nome, setNome] = useState(null);
  const [email, setEmail] = useState(null);
  const [senha, setSenha] = useState(null);
  const [aviso, setAviso] = useState(false);
    
  const addLogin = async () => {
    const user={
      user: nome,
      email: email,
      password:senha,      
    }

    await AsyncStorage.setItem("@cadastro", JSON.stringify(user) )
    console.log("Conta criada com sucesso")
    navigation.navigate("Login");
  }

  const validarCampos = () => {
      if (!nome || !email || !senha) {
          setAviso(true)
      return;
      } else {
        addLogin()        
      }
  };

  return (
    <KeyboardAwareScrollView
        style={{ flex: 0.5 }}
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        extraScrollHeight={30}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
    <View style={styles.container}>
      <View style={styles.containerEnt}>
        <Animatable.Image animation={"bounceIn"} duration={3000} source={require("./icon/picpay_com_fundo.png")}
            style={styles.ima}>
        </Animatable.Image>
      </View>
      <View style={styles.contInputs}>
        <View style={styles.contInput}>
          <Text style={styles.titulo}>Crie uma conta!</Text>
          <TextInput 
              style={styles.itens}
              placeholder='Nome'
              keyboardType="default"
              value={nome}
              onChangeText={setNome}
          />
          <TextInput 
              style={styles.itens}
              placeholder='Email'
              value={email}
              onChangeText={setEmail}
          />
          <TextInput 
              style={styles.itens}
              placeholder='Senha'
              keyboardType='default'
              value={senha}
              onChangeText={setSenha}
          />
        </View>
        {aviso && Alert.alert(
          "Acesso Negado",
          "Preencha o email e senha",
          [
            {
              text: "Fechar",
              onPress: () => {
                setAviso(false);
              }
            }
          ])}
        <View style={styles.contButton}>
          <Pressable
            onPress={() => validarCampos()}
            style={styles.menu}> 
            <Text>Entrar</Text>
          </Pressable>
          

          <Pressable onPress={() => navigation.replace('Login')} style={({ pressed }) => [styles.link, pressed && styles.pressed]}>
            <Text style={styles.text}>Tem uma conta? Entre por aqui</Text>
          </Pressable>

        </View>
        <StatusBar style="auto" />
      </View>
    </View>
    </KeyboardAwareScrollView>
  );
  
}