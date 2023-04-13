import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Home from "./screens/Home";
import Sidebar from "./screens/Sidebar";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Wallet from "./screens/Wallet";
import Meals from "./screens/Meals";

import WalletIcon from "./assets/icons/walletIcon";
import RecipeIcon from "./assets/icons/recipeIcon";
import MealsIcon from "./assets/icons/mealsIcon";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Recipes"
            useLegacyImplementation
            drawerContent={(props: any) => <Sidebar {...props} />}
            screenOptions={{
              headerShown: false,
              drawerContentContainerStyle: {
                backgroundColor: "white"
              },
              drawerActiveBackgroundColor: "#FF1E00",
              drawerActiveTintColor: "white",
              drawerInactiveTintColor: "#6D6D6D",
              drawerInactiveBackgroundColor: "white",
              drawerLabelStyle: {
                fontSize: 16,
                fontWeight: "bold",
                marginLeft: -10
              }
            }}>
            <Drawer.Screen
              options={{
                drawerIcon: ({ color }) => (
                  <WalletIcon
                    className="mt-2"
                    size={22}
                    stroke={color}
                    strokeWidth={1.6}
                  />
                )
              }}
              name="Wallet"
              component={Wallet}
            />
            <Drawer.Screen
              options={{
                drawerIcon: ({ color }) => (
                  <RecipeIcon className="mt-2" size={22} fill={color} />
                )
              }}
              name="Recipes"
              component={Home}
            />
            <Drawer.Screen
              options={{
                drawerIcon: ({ color }) => (
                  <MealsIcon className="mt-2" size={22} color={color} />
                )
              }}
              name="My Meals"
              component={Meals}
            />
          </Drawer.Navigator>
        </NavigationContainer>
    </SafeAreaProvider>
  );
}
