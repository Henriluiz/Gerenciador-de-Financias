import { StyleSheet  } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; // Usa isso, no lugar de pixels ex: wp("10%") e hp("10%")

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },

  header: {
    flex: 1,
    padding: 10
  },

  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 5,
  },

  tituloModal: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
    color: "#fff"
  },

  list: {
    flex: 1,
    gap: 5,
  },

  containerModal: {
    alignItems: "center",
    justifyContent: "center",
  },
  
  contentModal: {
    marginTop: hp("30%"),
    marginInline: wp("10%"),
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#21C25E",
    
  },

  contentInput: {
    gap: 18,
  },

  itensInput: {
    width: 200,
    borderStyle: "solid",
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: "#fff",
  },

  saldoIns: {
    color: "#e74c3c",
    fontWeight: "bold",
    padding: 5
  },

  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    paddingVertical: 15,
    gap: 5
  },

  contentButton: {
    flexDirection: "row",
    gap: 25,
    padding: wp("2%")
  },

  cancelarModal: {
    padding: 10,
    backgroundColor: "#e74c3c",
    borderRadius: 15,
  },

  confirmarModal: {
    padding: 10,
    backgroundColor: "#87fc0a",
    borderRadius: 15,
  },

  confirmarBloqueadoModal: {
    padding: 10,
    backgroundColor: "#7bef0080",
    borderRadius: 15,
  },
});