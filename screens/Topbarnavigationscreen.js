import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Dealsscreen from "./Dealsscreen";
//import Homescreen from "./Homescreen";
import Loadingscreen from "../components/Loadingscreen";
import { View, Text } from "react-native";
import Hometoptab from "./Hometoptab";
const Topbarnavigationscreen = () => {
  console.log("ugugug");
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator screenOptions={{}}>
      <Tab.Screen name="hiome" component={Hometoptab} />
      <Tab.Screen name="deeals" component={Dealsscreen} />
    </Tab.Navigator>
  );
};

export default Topbarnavigationscreen;
