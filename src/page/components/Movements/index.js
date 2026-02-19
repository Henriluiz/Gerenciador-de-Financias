import { Text, View, Pressable, StyleSheet} from 'react-native';
import { useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; // Usa isso, no lugar de pixels ex: wp("10%") e hp("10%")

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// <MaterialIcons name="attach-money" size={24} color="black" /> ganhei money
// <MaterialIcons name="money-off" size={24} color="black" /> Perdi money


export default function Movements({ data }) {
    const [showValue, setShowValue] = useState(false);

    return (
    <Pressable style={styles.container} onPress={() => setShowValue(!showValue)}>
        <Text style={styles.date}>{data.date}</Text>

        <View style={styles.content}>
            <Text style={styles.label}>{data.name}</Text>

            { showValue ? (
            <Text style={data.type === 1 ? styles.value : styles.expenses}> 
                {data.type === 1 ? <Text>{data.value}</Text> : <Text>-{data.value}</Text> }
            </Text>
            ) : (
                <View style={styles.skeleton}></View>
            )}

            
        </View>
    </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: hp("3%"),
        borderBottomWidth: 0.5,
        borderBottomColor: "#21C25E",
    },

    content: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 2,
        marginBottom: 6
    },

    date: {
        color: "#21C25E",
        fontWeight: "bold"
    },

    label: {
        fontWeight: "bold",
        fontSize: 16,
    },

    value:{
        fontSize: 16,
        color: "#2ecc71",
        fontWeight: "bold"
    },
    expenses:{
        fontSize: 16,
        color: "#e74c3c",
        fontWeight: "bold"
    },

    skeleton: {
        marginTop: 8,
        width: wp("25%"),
        height: hp("2%"),
        backgroundColor: "#21C25E",
        borderRadius: 8,
    },
})