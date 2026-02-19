import { Text, View, Pressable, Modal, Image, TextInput, StyleSheet, ScrollView} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; // Usa isso, no lugar de pixels ex: wp("10%") e hp("10%")
import {useState} from "react";

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
// <FontAwesome6 name="add" size={24} color="black" />
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
// <FontAwesome name="remove" size={24} color="black" />

import AntDesign from '@expo/vector-icons/AntDesign';

export default function Actions({ onOpenModalCompra, onOpenModalGanho,
    onClearList , onClearUltList, reloadUp}) {
    


  return (
    <ScrollView style={styles.container} horizontal={true} showsHorizontalScrollIndicator={false}>
        <Pressable style={styles.actionButton} onPress={() => onOpenModalGanho()}>
            <View style={styles.areaButton}>
                <FontAwesome6 name="add" size={24} color="black" />
            </View>
            <Text style={styles.labelButton}>Entradas</Text>
        </Pressable>

        <Pressable style={styles.actionButton} onPress={() => onOpenModalCompra()}>
            <View style={styles.areaButton}>
                <AntDesign name="tag" size={24} color="black"/>
            </View>
            <Text style={styles.labelButton}>Compras</Text>
        </Pressable>

        <Pressable style={styles.actionButton}>
            <View style={styles.areaButton}>
                <AntDesign name="credit-card" size={24} color="black"/>
            </View>
            <Text style={styles.labelButton}>Cartão</Text>
        </Pressable>

        <Pressable style={styles.actionButton}>
            <View style={styles.areaButton}>
                <AntDesign name="barcode" size={24} color="black" />
            </View>
            <Text style={styles.labelButton}>Boleto</Text>
        </Pressable>

        <Pressable style={styles.actionButton}>
            <View style={styles.areaButton}>
                <FontAwesome6 name="pix" size={24} color="black" />
            </View>
            <Text style={styles.labelButton}>Pix</Text>
        </Pressable>

        <Pressable style={styles.actionButton} onPress={() => reloadUp()}>
            <View style={styles.areaButton}>
                <AntDesign name="reload" size={24} color="black" />
            </View>
            <Text style={styles.labelButton}>Carregar</Text>
        </Pressable>
        
        <Pressable style={styles.actionButton} onPress={() => onClearList()}>
            <View style={styles.areaButton}>
                <AntDesign name="delete" size={24} color="black" />
            </View>
            <Text style={styles.labelButton}>Limpar</Text>
        </Pressable>
        
        <Pressable style={styles.actionButton} onPress={() => onClearUltList()}>
            <View style={styles.areaButton}>
                <MaterialIcons name="delete-outline" size={24} color="black" />
            </View>
            <Text style={styles.labelButton}>Útlimo</Text>
        </Pressable>

        <Pressable style={styles.actionButton}>
            <View style={styles.areaButton}>
                <AntDesign name="setting" size={24} color="black" />
            </View>
            <Text style={styles.labelButton}>Conta</Text>
        </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp("15%"),
  },

  actionButton: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp("5%")
  },

  areaButton: {
    backgroundColor: "#ecf0f1",
    width: wp("15%"),
    height: hp("7,5%"),
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  labelButton: {
    marginTop: 3,
    textAlign: "center",
    fontWeight: "bold",
  },

});