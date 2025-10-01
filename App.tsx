import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListScreen from "./src/screens/ListScreen";
import DetailScreen from "./src/screens/DetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="List" component={ListScreen} options={{ title: "Смены рядом" }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: "Детали смены" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
