import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable, Modal, Platform , TextInput, Alert, FlatList, TurboModuleRegistry} from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles from './styles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';

import CheckBox from "expo-checkbox";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Header from "../components/Header"
import Movements from '../components/Movements';
import Actions from '../components/Actions';

import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ActivityIndicator } from 'react-native-web';
// <MaterialIcons name="attach-money" size={24} color="black" /> ganhei money
// <MaterialIcons name="money-off" size={24} color="black" /> Perdi money

export default function Menu( {logar} ) {
  const navigation = useNavigation();
  const [posicaoModal, setPosicaoModal] = useState(false);
  const [list, setList] = useState([
   
  ]);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('');
  const [agree, setAgree] = useState(false);
  const [aprovadoCompra, setAprovadoCompra] = useState(true);
  const [aprovadoCompraData,setAprovadoCompraData] = useState(true)
  const [compra, setCompra] = useState(true);
  const [saldo, setSaldo] = useState(0);
  
  const [logan, setLogan] = useState(logar)




  const formatted = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date());


  function maskValorBRL(text, tipoTrans) { // se tipoTrans for 1 é compra, se for 0 é ganho
    const digits = String(text ?? "").replace(/\D/g, "");
    const number = digits ? Number(digits) / 100 : 0;

    if (tipoTrans == 1 && number > Number(saldo ?? 0)) { // Verificar se a transferência for
    //  uma compra, ele verificar que o valor da compra é infeior ou maior. Se for em inferior, aprova!
      setAprovadoCompra(false);
    } else {
      setAprovadoCompra(true);
    }

    // se não tem número, só limpa o input
    if (!digits) return "";
    console.log({ number, saldo, tipoTrans });
    return number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function numValorBRL(valorFormatado) {
    const s = String(valorFormatado ?? "").trim();
    if (!s) return 0;

    const limpo = s
      .replace(/[R$\s]/g, "") // tira R$ e espaços
      .replace(/\./g, "")     // tira milhares
      .replace(",", ".");     // vírgula -> ponto

    const n = Number(limpo);
    return Number.isFinite(n) ? n : 0; // nunca devolve NaN
  }

  const verificarExtSaldo = async () => {
    try {
      const obj = await AsyncStorage.getItem("@transferencias");
      const saldo_antigo = await AsyncStorage.getItem("@saldo")
      if (obj !== null && saldo_antigo !== null) {
        const valores = JSON.parse(obj)
        const saldo_ant = JSON.parse(saldo_antigo)
        return [valores, saldo_antigo]
      }
    } catch (error) {
      console.log("Erro ao carregar", error);
    }
  };


  const addItem = async () => {
    const newTrans = {
      id: Date.now().toString(), // ID único
      name: name,
      value: value,
      date: brParaISO(date),
      type: String(type),
    };

    prev = verificarExtSaldo()
    const transferencias = [...prev, newTrans] 

    await AsyncStorage.setItem("@transferencias", JSON.stringify(transferencias))
    await AsyncStorage.setItem("@saldo", JSON.stringify(saldo))
    console.log("Salvo com sucesso")

  }

  // Adicionar novo usuário
  const addTrans = () => {
    if (!aprovadoCompra) {
      return;
    }
    try {
      if (!name.trim() || !value.trim() || !date.trim()) {
          alert('Preencha todos os campos!');
          return;
      }
    } catch (erro) {
      return;
    }

    // Validação de Datas, se a data houve 4 caracteres o ano será o atual.
    // console.log(date.length)
    if (date.length <= 9) {
      console.log("Entrei")
      alert("Coloque a data completa")
      return;
    };

    const newTrans = {
      id: Date.now().toString(), // ID único
      name: name,
      value: value,
      date: brParaISO(date),
      type: String(type),
    };

    const valor = numValorBRL(value);
    const t = Number(type); // garante número

    setSaldo(prev => {
      const novo = t == 0 ? prev - valor : prev + valor;
      return Number.isFinite(novo) ? novo : prev; // não deixa virar NaN
    });

    setList(prev => [...prev, newTrans]);; // Adiciona ao array
    setName('');
    setDate('');
    setValue('');
    setType('');
    setAgree(false);
    setPosicaoModal(false);

    addItem()

  };


  function maskDataDDMMYYYY(text) { // Verificar o formato e vai atualizando de acordo que o user escreve!
    const digits = text.replace(/\D/g, "").slice(0, 8); // só números, máx 8

    const anoAtual = new Date().getFullYear()
    
    const diaStr = digits.slice(0, 2);
    const mesStr = digits.slice(2, 4);
    const anoStr = digits.slice(4, 8);

    // Validação por completo
    const dia = Number(digits.slice(0, 2));
    const mes = Number(digits.slice(2, 4));
    const ano = Number(digits.slice(4, 8));

    if ( 1 > dia && dia > 31){ // Validação de Dia
      setAprovadoCompraData(false)
    } 
    if (1 > mes && mes > 12){ // Validação de mês
      setAprovadoCompraData(false)
    }
    if (ano != anoAtual) {
      setAprovadoCompraData(false)
    } 
    // > Validação concluída!


    // console.log(Date(`${dia}/${mes}/${ano}`))

    if (digits.length <= 2) return diaStr;
    if (digits.length <= 4) return `${diaStr}/${mesStr}`;
    setAprovadoCompraData(true);
    return `${diaStr}/${mesStr}/${anoStr}`
  }

  function brParaISO(texto) {
    // formato básico
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(texto)) return null;

    const [dd, mm, yyyy] = texto.split("/").map(Number);

    // cria data local (sem UTC)
    const d = new Date(yyyy, mm - 1, dd);

    // verifica se existe
    if (
      d.getFullYear() !== yyyy ||
      d.getMonth() !== mm - 1 ||
      d.getDate() !== dd
    ) return null;

    // gera ISO manual (sem timezone)
    return (
      String(yyyy).padStart(4, "0") + "-" +
      String(mm).padStart(2, "0") + "-" +
      String(dd).padStart(2, "0")
    );
  }

  function fecharModal() {
    setPosicaoModal(false)
    setName("");
    setValue("");
    setDate("");
    setAgree(false);
  };

  function delUltTrans() {
    const ultimo = list.length > 0 ? list[list.length - 1] : null;
    const ultimoValor = list.at(-1)?.value;
    const ultimoTipo = list.at(-1)?.type;

    const valor = numValorBRL(ultimoValor);
    const t = Number(ultimoTipo); // garante número

    setSaldo(prev => {
      const novo = t == 1 ? prev - valor : prev + valor;
      return Number.isFinite(novo) ? novo : prev; // não deixa virar NaN
    });

    setList(prev => prev.slice(0, -1))
  };

  useEffect(() => { 
    const [saldo, extrato] = verificarExtSaldo();
    setSaldo(saldo)
    setList(extrato);
  }, []);

  return (
    <View style={styles.container}>
      <Header 
        saldo={saldo}
        closeProfile = {() => (salvarTudo(list, saldo), navigation.replace("Login"))}
      />
      <View style={{paddingInline: 10}}>
        <Actions 
          onOpenModalCompra={() => (setPosicaoModal(true), setCompra(true), setType(0))}
          onOpenModalGanho={() => (setPosicaoModal(true), setCompra(false), setType(1))}
          onClearList = {() => (setList([]), setSaldo(0))}
          onClearUltList = {() => delUltTrans()}
        />
        <Modal transparent={true} visible={posicaoModal}>
          <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid={true}
            extraScrollHeight={30}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
          <View style={styles.contentModal}>
            <Text style={styles.tituloModal}>{compra ? <Text>Sua Útlima Compra/Serviço</Text> : <Text>Sua Útlima Receita</Text>}</Text>
            <View style={styles.contentInput}>
              <TextInput
                style={styles.itensInput}
                placeholder='Nome'
                keyboardType='default'
                autoCapitalize="none"
                autoCorrect={false}
                value={name}
                maxLength={100}
                onChangeText={setName}
              />
              <TextInput
                style={styles.itensInput}
                placeholder='Valor'
                keyboardType='numeric'
                autoCapitalize="none"
                autoCorrect={false}
                value={value}
                onChangeText={(v) => setValue(maskValorBRL(v, (compra) ? 1 : 0))}
              />
            </View>
            <View>
              {!aprovadoCompra ? <Text style={styles.saldoIns}>Saldo Insuficiente!</Text> : <Text></Text>}
              <TextInput
                style={styles.itensInput}
                placeholder='Data'
                keyboardType='numeric'
                autoCapitalize="none"
                autoCorrect={false}
                value={date}
                onChangeText={(t) => setDate(maskDataDDMMYYYY(t))}
              />
            </View>
            <View style={styles.wrapper}>
              <CheckBox
                value={agree}
                onValueChange={() => {
                  const novoValor = !agree;
                  setAgree(novoValor); (!agree) ?
                  setDate(formatted) : setDate("")
                }}
                color={agree ? "#4630EB" : undefined}
                />
              <Text style={{fontSize: 15}}>Data de Hoje?</Text>
            </View>
            <View style={styles.contentButton}>
              <Pressable style={styles.cancelarModal} onPress={() => fecharModal()}>
                  <Text style={{color: "#FFF"}}>Cancelar</Text>
              </Pressable>
              <Pressable style={(aprovadoCompra) ? styles.confirmarModal : styles.confirmarBloqueadoModal} onPress={() => addTrans()}>
                  <Text>Confirmar</Text>
              </Pressable>
            </View>
          </View>
          </KeyboardAwareScrollView>
        </Modal>
        
      </View>
      <View style={styles.header}>
        <Text style={styles.titulo}>Acompanhe suas últimas compras</Text>

        <FlatList
         style={styles.list}
         contentContainerStyle={{ gap: 5, paddingBottom: 20 }}
         data={list}
         keyExtractor={(item) => String(item.id)}
         showsVerticalScrollIndicator={false}
         renderItem={({ item }) => <Movements data={item} />}>

        </FlatList>
      </View>
    </View>
  );
}