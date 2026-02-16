import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable, ImageBackground, Image, TextInput, Alert} from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState(null);
  const [senha, setSenha] = useState(null);
  const [aviso, setAviso] = useState(false);
    

  const validarCampos = () => {
      if (!email.trim() || !senha.trim()) {
          setAviso(true)
      return;
      } else {
          navigation.navigate('Splash')
      }
  };



  return (
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
              keyboardType='numeric'
              value={senha}
              onChangeText={setSenha}
          />
        </View>
      
        <View style={styles.contButton}>
          <Pressable
            onPress={() => navigation.replace('Cadastro')}
            style={styles.menu}> 
            <Text>Entrar</Text>
          </Pressable>
          
          <Pressable
              style={styles.recuperarSenha}
              onPress={() => Alert.alert(`Email enviado para ${email}`)}
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
  );
}