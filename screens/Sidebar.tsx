import { View, Text, Image, SafeAreaView, TouchableOpacity } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from "@react-navigation/drawer";
import LogoutIcon from "../assets/icons/logoutIcon";
import useAuth from "../hooks/useAuth";

const Sidebar = (props: any) => {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    props.navigation.closeDrawer();
  };

  const getLabel = (focused: boolean, color: string, label: string) => {
    return (
      <View
        className={`${
          focused ? "bg-[#FF1E00]" : ""
        }  h-6 w-full flex-row items-center space-x-4 rounded-lg `}>
        <LogoutIcon stroke={props.color} className={`mt-2`} />
        <TouchableOpacity onPress={handleLogout}>
          <Text className={`text-lg ${focused ? "text-white" : "text-[#6D6D6D]"}  `}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView className="relative flex-col justify-between h-full">
      <DrawerContentScrollView className="relative h-full" {...props}>
        <View className="flex-1">
          <View className="px-5 pt-20 pb-12">
            <Image source={require("../assets/png/Logo.png")} />
          </View>

          <DrawerItemList {...props} />
          <DrawerItem
            label={({ focused, color }) => getLabel(focused, color, "Logout")}
            onPress={() => props.navigation.navigate("Recipes")}
          />
        </View>
      </DrawerContentScrollView>
      <View className="h-[72px] w-full flex-row items-center justify-between bg-[#F8F8F8] p-4">
        <View>
          <Text className="font-[Poppins-600] text-sm font-semibold text-[#212B36]">
            {user?.given_name}
          </Text>
          <Text className="font-[Poppins-400] text-xs font-semibold text-[#6D6D6D]">
            {user?.email}
          </Text>
        </View>
        <Image
          className="rounded-full"
          style={{ width: 50, height: 50 }}
          source={{ uri: user?.picture }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Sidebar;
