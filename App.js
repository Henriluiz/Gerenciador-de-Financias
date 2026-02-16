import React, { useState } from "react";
import { View, Text, Modal, Pressable, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Splash from "./src/page/Splash";
import Login from "./src/page/Login";
import Cadastro from "./src/page/Cadastro";

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerTransparent: true,
            headerTitle: '',
          }}
        />
        <Stack.Screen name="Login" component={Login}   options={{
            headerTransparent: true,
            headerTitle: '',
          }}
        />
        <Stack.Screen name="Cadastro" component={Cadastro}   options={{
            headerTransparent: true,
            headerTitle: '',
          }}
        />
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
