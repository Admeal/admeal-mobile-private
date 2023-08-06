import { Image, Text, TouchableOpacity, View } from "react-native";

import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList
} from "@react-navigation/drawer";
import LogoutIcon from "../assets/icons/logoutIcon";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/dataAtom";
import AdmealLogoSmall from "../assets/icons/admealLogoSmall";

type SidebarProps = {
  navigation: NavigationProp;
  color: string;
  state: any;
  descriptors: any;
};

const Sidebar = (props: SidebarProps) => {
  const [userItem, setUserItem] = useRecoilState(userState);

  const handleLogout = () => {
    setUserItem(null);
    setTimeout(() => {
      props.navigation.closeDrawer();
    }, 200);
  };

  const getLabel = (focused: boolean, color: string, label: string) => {
    return (
      <View
        className={`${
          focused ? "bg-[#FF1E00]" : ""
        }  h-6 w-full flex-row items-center space-x-4 rounded-lg `}>
        <LogoutIcon stroke={props.color} className={`mt-2`} />
        <TouchableOpacity onPress={handleLogout}>
          <Text
            className={`-pb-4 text-lg font-semibold ${
              focused ? "text-white" : "text-[#6D6D6D]"
            }  `}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="relative flex-col justify-between h-full">
      <DrawerContentScrollView className="relative h-full" {...props}>
        <View className="flex-1">
          <View className="px-5 pt-20 pb-12">
            <View className="h-16">
              <AdmealLogoSmall />
            </View>
          </View>

          <DrawerItemList {...props} />
          <View className="pb-4">
            <DrawerItem
              label={({ focused, color }) => getLabel(focused, color, "Logout")}
              onPress={() => handleLogout}
            />
          </View>
        </View>
      </DrawerContentScrollView>
      <View className="h-[72px] w-full flex-row items-center justify-between bg-[#F8F8F8] p-4">
        <View>
          <Text className="font-[Poppins-600] text-sm font-semibold text-[#212B36]">
            {userItem?.additionalUserInfo.profile?.given_name}
          </Text>
          <Text className="font-[Poppins-400] text-xs font-semibold text-[#6D6D6D]">
            {userItem?.additionalUserInfo.profile?.email}
          </Text>
        </View>
        <Image
          className="rounded-full"
          style={{ width: 50, height: 50 }}
          source={{ uri: userItem?.additionalUserInfo.profile?.picture, method: "POST" }}
        />
      </View>
    </View>
  );
};

export default Sidebar;
