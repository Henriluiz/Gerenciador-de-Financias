import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable, ImageBackground, Image, TextInput, Alert} from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState(null);
  const [senha, setSenha] = useState(null);
  const [aviso, setAviso] = useState(false);

  const validarCampos = () => {
      if (!email || !senha) {
          setAviso(true)
      return;
      } else if (email != "luiz@gmail.com" || senha != "Luiz2145@#"){
        setAviso(true)
        return;
      } else {
          const logado = true
          navigation.navigate('Menu', {logado})
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
              
            <Text style={styles.titulo}>Bem vindo de volta!</Text>
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
                secureTextEntry
            />
          </View>
        {aviso && Alert.alert(
          "Acesso Negado",
          "Verifique o email e senha",
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
          
          <Pressable
              style={styles.recuperarSenha}
              onPress={() => (email) ? Alert.alert("Email enviado", `para ${email}`) : Alert.alert("Preencha os campos", "Preencha o email para rescuperar a senha")}
          >
              <Text style={styles.buttonText}>Esqueci minha Senha</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('Cadastro')} style={({ pressed }) => [styles.link, pressed && styles.pressed]}>
            <Text style={styles.text}>É novo? Então crie sua conta aqui</Text>
          </Pressable>

        </View>
        <StatusBar style="auto" />
      </View>
    </View>
  </KeyboardAwareScrollView>
  );
}