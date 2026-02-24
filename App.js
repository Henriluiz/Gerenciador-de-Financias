import React, { useState } from "react";
import { View, Text, Modal, Pressable, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Splash from "./src/page/Splash";
import Login from "./src/page/Login";
import Cadastro from "./src/page/Cadastro";
import Menu from "./src/page/Menu"

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Login" component={Login}   options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Cadastro" component={Cadastro}   options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Menu" component={Menu} options={{
          headerShown: false,
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
