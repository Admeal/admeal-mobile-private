import { SafeAreaView } from "react-native";
import HomeTopBar from "../components/HomeTopBar";
import RecipesBar from "../components/RecipesBar";
import RecipeTabs from "../components/RecipeTabs";
import getUserEndpoint from "../endpoints/getUsersEndpoint";
import { useEffect } from "react";
import getMyMealsEndpoint from "../endpoints/getMyMealsEndpoint";
import getRecipesEndpoint from "../endpoints/getRecipesEndpoint";
import { userListState, userIdState } from "../atoms/dataAtom";
import { useRecoilState } from "recoil";
import useAuth from "../hooks/useAuth";

export default function Home({ navigation }: any) {
  const [userList, setUserList] = useRecoilState(userListState);
  const [userId, setUserId] = useRecoilState(userIdState);
  const { user } = useAuth();
  getUserEndpoint();
  getRecipesEndpoint();
  getMyMealsEndpoint();

  useEffect(() => {
    setUserId(null);
    setTimeout(() => {
      // if user by email not in user list, add user to user list
      Object.keys(userList).map((key) => {
        if (userList[key].email === user.email) {
          setUserId(userList[key].user_id);
        }
      });

      if (userId === null) {
        // create new user endpoint from user data
      }
    }, 1000);
  }, [userList]);

  return (
    <SafeAreaView className="relative">
      <HomeTopBar navigation={navigation} />
      <RecipesBar />
      <RecipeTabs navigation={navigation} routeName="Recipes" />
    </SafeAreaView>
  );
}
