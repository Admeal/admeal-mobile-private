import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import Sidebar from "../screens/Sidebar";

import Wallet from "../screens/Wallet";
import Meals from "../screens/Meals";

import WalletIcon from "../assets/icons/walletIcon";
import RecipeIcon from "../assets/icons/recipeIcon";
import MealsIcon from "../assets/icons/mealsIcon";
import RecipeDetails from "../screens/RecipeDetails";
import CheckStatus from "../screens/CheckStatus";
import CameraUpload from "../screens/CameraUpload";
import ImageVerification from "../screens/ImageVerification";
import Login from "../screens/Login";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
// import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
// import { db } from "../firebaseConfig";
import { useRecoilState } from "recoil";
import { myMealsListState, recipeListState, userState } from "../atoms/dataAtom";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const StackLogin = createStackNavigator();

const RecipeStack = () => {
  const [user, setUser] = useRecoilState(userState);
  const [recipeList, setRecipeList] = useRecoilState(recipeListState);
  const [myMealsList, setMyMealsList] = useRecoilState<any>(myMealsListState);
  // const { user } = useAuth();

  useEffect(() => {
    // const fetchRecipes = async () => {
    //   const query = await getDocs(collection(db, "recipes"));
    //   const array = query.docs.map((doc) => {
    //     return doc.data();
    //   });
    //   setRecipeList(array);
    //   console.log("get recipes");
    // };
    // // const unsubscribe = onSnapshot(collection(db, "recipes"), (snapshot) => {
    // //   const array = snapshot.docs.map((doc) => {
    // //     return doc.data();
    // //   });
    // //   setRecipeList(array);
    // // });
    // fetchRecipes();
    // return () => {
    //   // unsubscribe();
    //   console.log("unsubscribed recipes");
    // };
  }, []);

  useEffect(() => {
    // // refactor to the new db structure where my meals is a collection with the user id as the doc id and the meals of each user are the docs
    // const unsubscribe = onSnapshot(
    //   query(collection(db, "my_meals"), where("user_id", "==", user?.id)),
    //   (snapshot) => {
    //     console.log("sub meals");
    //     const array = snapshot.docs.map((doc) => {
    //       return doc.data();
    //     });
    //     setMyMealsList(array);
    //   }
    // );
    // return () => {
    //   unsubscribe();
    //   console.log("unsubscribed meals");
    // };
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
