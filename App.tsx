import "./expo-crypto-shim.js";
import { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { RecoilRoot } from "recoil";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import Home from "./screens/Home";
import Sidebar from "./screens/Sidebar";

import Wallet from "./screens/Wallet";
import Meals from "./screens/Meals";

import WalletIcon from "./assets/icons/walletIcon";
import RecipeIcon from "./assets/icons/recipeIcon";
import MealsIcon from "./assets/icons/mealsIcon";
import RecipeDetails from "./screens/RecipeDetails";
import CheckStatus from "./screens/CheckStatus";
import CameraUpload from "./screens/CameraUpload";
import ImageVerification from "./screens/ImageVerification";
import Login from "./screens/Login";
import useAuth, { AuthProvider } from "./hooks/useAuth";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const RecipeStack = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        // headerBackground: () => null,
        headerTransparent: true,
        headerShown: false,
        headerStyle: {
          backgroundColor: "transparent"
        }
      }}>
      {user ? (
        <Stack.Group>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="RecipeDetails" component={RecipeDetails} />
          <Stack.Screen name="CheckStatus" component={CheckStatus} />
          <Stack.Screen name="CameraUpload" component={CameraUpload} />
          <Stack.Screen name="ImageVerification" component={ImageVerification} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="Login" component={Login} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-900": require("./assets/fonts/Poppins-Black.ttf"),
    "Poppins-800": require("./assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-700": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-600": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-500": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-400": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-300": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-200": require("./assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-100": require("./assets/fonts/Poppins-Thin.ttf")
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <RecoilRoot>
        <AuthProvider>
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
                component={RecipeStack}
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
        </AuthProvider>
      </RecoilRoot>
    </SafeAreaProvider>
  );
}
