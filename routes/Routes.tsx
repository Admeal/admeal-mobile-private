import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import Sidebar from "../screens/Sidebar";
import Wallet from "../screens/Wallet";
import Meals from "../screens/Meals";
import RecipeDetails from "../screens/RecipeDetails";
import CheckStatus from "../screens/CheckStatus";
import CameraUpload from "../screens/CameraUpload";
import ImageVerification from "../screens/ImageVerification";
import Login from "../screens/Login";

import WalletIcon from "../assets/icons/walletIcon";
import RecipeIcon from "../assets/icons/recipeIcon";
import MealsIcon from "../assets/icons/mealsIcon";

import firestore from "@react-native-firebase/firestore";
import { useRecoilState } from "recoil";
import {
  myMealsListState,
  recipeListState,
  userState,
  userCreditsState
} from "../atoms/dataAtom";

type RootStackParamList = {
  Home: undefined;
  "My Meals": undefined;
  Wallet: undefined;
  Meals: undefined;
  RecipeDetails: undefined;
  CheckStatus: undefined;
  CameraUpload: undefined;
  ImageVerification: undefined;
  Login: undefined;
};

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator<RootStackParamList>();
const StackLogin = createStackNavigator<RootStackParamList>();

const RecipeStack = () => {
  const [user, setUser] = useRecoilState(userState);
  const [userCredits, setUserCredits] = useRecoilState(userCreditsState);
  const [recipeList, setRecipeList] = useRecoilState(recipeListState);
  const [myMealsList, setMyMealsList] = useRecoilState(myMealsListState);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("recipes")
      // .where("enabled", "==", true)
      .orderBy("created_at", "desc")
      .onSnapshot((querySnapshot) => {
        const array = querySnapshot.docs.map((doc) => doc.data());
        setRecipeList(array as []);
        console.log("recipes sub");
      });

    return () => {
      unsubscribe();
      console.log("unsubscribed recipes");
    };
  }, []);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection(`user_data`)
      .doc(user?.user.uid)
      .collection("meals")
      .orderBy("created_at", "desc")
      .onSnapshot((querySnapshot) => {
        const array = querySnapshot.docs.map((doc) => doc.data());
        setMyMealsList(array as []);
        console.log("meals sub");
      });

    return () => {
      unsubscribe();
      console.log("unsubscribed meals");
    };
  }, []);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection(`user_data`)
      .doc(user?.user.uid)
      .collection("user_info")
      .doc("credits")
      .onSnapshot((doc) => {
        const data = doc.data();
        console.log("credits sub");
        setUserCredits({
          admeal_token: data?.admeal_token,
          dish_token: data?.dish_token
        });
      });
    // console.log("aaaa", userCredits);

    return () => {
      unsubscribe();
      console.log("unsubscribed credits");
    };
  }, []);

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
      <Stack.Group>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="My Meals" component={Meals} />
        <Stack.Screen name="RecipeDetails" component={RecipeDetails} />
        <Stack.Screen name="CheckStatus" component={CheckStatus} />
        <Stack.Screen name="CameraUpload" component={CameraUpload} />
        <Stack.Screen name="ImageVerification" component={ImageVerification} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const LoginStack = () => (
  <StackLogin.Navigator
    screenOptions={{
      // headerBackground: () => null,
      headerTransparent: true,
      headerShown: false,
      headerStyle: {
        backgroundColor: "transparent"
      }
    }}>
    <StackLogin.Screen name="Login" component={Login} />
  </StackLogin.Navigator>
);

const HomeStack = () => (
  <Drawer.Navigator
    initialRouteName="Recipes"
    // useLegacyImplementation
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
          <WalletIcon className="mt-2" size={22} stroke={color} strokeWidth={1.6} />
        )
      }}
      name="Wallet"
      component={Wallet}
    />
    <Drawer.Screen
      options={{
        drawerIcon: ({ color }) => <RecipeIcon className="mt-2" size={22} fill={color} />
      }}
      name="Recipes"
      component={RecipeStack} //
    />
    <Drawer.Screen
      options={{
        drawerIcon: ({ color }) => <MealsIcon className="mt-2" size={22} color={color} />
      }}
      name="My Meals"
      component={Meals}
    />
  </Drawer.Navigator>
);
const Routes = () => {
  const [user, setUser] = useRecoilState(userState);
  return (
    <NavigationContainer>{user ? <HomeStack /> : <LoginStack />}</NavigationContainer>
  );
};

export default Routes;
