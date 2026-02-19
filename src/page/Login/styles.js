import { StyleSheet  } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  
  containerEnt: {
    flex: 1,
    // justifyContent: 'center',
    justifyContent: "flex-end",
    alignItems: 'center',
  },

  contInputs: {
    flex: 0.8,
    // justifyContent: 'center',
    alignItems: 'center',
  },

  contInput: {
    gap: 20,
    marginVertical: 40,
    textAlign: 'left'
  },

  ima: {
    width: 250,
    height: 60,
    
  },

  titulo: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#21C25E',
    textAlign: 'left',
    // marginVertical: 25,
    // padding: 10,
  },

  itens: {
    width: 200,
    borderStyle: "solid",
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: "#21C25E",
  },

  menu: {
    backgroundColor: "#21C25E",
    width: 200,
    alignItems: "center",
    padding: 10,
    borderRadius: 5
  },

  recuperarSenha: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#21C25E",
    backgroundColor: "#FFFFF",
    width: 200,
    alignItems: "center",
    padding: 10,
    borderRadius: 5
  },

  contButton: {
    gap: 10,
  },

  link: {
    padding: 1,
    borderRadius: 5,
  },

  pressed: {
    opacity: 0.7,
  },
  
  text: {
    color: '#21C25E',
    fontSize: 12,
    textDecorationLine: "underline",
    textAlign: "center"
  },

  button: {

  },

  buttonText: {

  },




});