import React ,{useEffect, useState, useContext} from "react";
import { View,Text,Pressable ,StyleSheet,TouchableOpacity, BackHandler} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homescreen from "./Homescreen";
import { Entypo,AntDesign ,MaterialIcons,FontAwesome,
  
  MaterialCommunityIcons ,Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import Loadingscreen from '../components/Loadingscreen';
import { getAuth,signOut } from "firebase/auth";
import {StackActions} from '@react-navigation/native';
import { Userinfo_Context,Cartinfo_Context,Userstate_Context } from "../GlobalContext/Context";
import Accountscreen from "./Accountscreen";
import Orderscreen from "./Ordersscreen";

/* <Text  allowFontScaling = {false} style={{color:txtcolors,
            fontSize:14, 
            fontFamily:"Inter-Regular"}}>{route.name}</Text>*/

const Tabnavigationscreen = ({navigation}) =>{


  const [goback,setgoback] = useState(false)


  


  let [fontsLoaded] =   useFonts ({
    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
  });






  if  (!fontsLoaded)  {
    return null
  }

    const Tab = createBottomTabNavigator();
    return( 
    <Tab.Navigator 
   
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        let n;
        let txtcolors = "#7F7F7F"
        if (route.name === 'Home') {
  
          iconName = focused
            ? 'home-outline'
            : 'home-outline';
            txtcolors = color
          
        }else if (route.name === 'Orders') {
        
         iconName = focused 
          ? "cart-check"
          : "cart-check"
          txtcolors = color
        } else if (route.name === 'Account') {

          iconName = focused 
          ? 'account-circle' 
          : 'account-circle';
          txtcolors = color
        } 

        // You can return any component that you like here!
       
        return (

     
        <View style={styles.tabiconhold}>

         {iconName === "home-outline"?
         <Ionicons name="home-outline" size={24} color={color} />
         :iconName === "cart-check"?
         <MaterialCommunityIcons name="cart-check"  size={24}  color={color}/>
         :
         <SimpleLineIcons name="user" size={24} color={color} />

         }
        </View>
         
    
        )
       
      },
      tabBarButton: (props) => <TouchableOpacity {...props} />,
      tabBarHideOnKeyboard: true,
      tabBarActiveTintColor: '#F47A00',
      tabBarInactiveTintColor: '#7F7F7F',
      headerShown:false,
      tabBarShowLabel:true,
      tabBarStyle:{backgroundColor:"white",alignItems:"center" },
      tabBarLabelStyle:{fontSize:12, allowFontScaling:false  },
     
    })}
  >
        <Tab.Screen name="Home" component={Homescreen}  />
        <Tab.Screen name="Orders" component={Orderscreen} />

        <Tab.Screen name="Account" component={Accountscreen} />
     
      </Tab.Navigator>
    
  );

}


function Orders() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text >Orders!</Text>
      </View>
    );
  }
  
  
  function Account({backkeyy,navigation}) {

    const [userscreenstate,setuserscreenstate] = useContext(Userstate_Context)

console.log("account =================")
    const auth = getAuth();
    const fnsignout = () => {
     
      signOut(auth).then(() => {
      //  alert("Sign-out successful")
      }).catch((error) => {
        alert("An error happened")
      });
      
      setuserscreenstate("loggedout")
     
      }



   


    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text onPress={ ()=> fnsignout()}>Account!</Text>
      </View>
    );
  }
  
  


  const styles = StyleSheet.create({
    tabiconhold:{
alignItems:"center"



    },
    tabbar:{

 backgroundColor:"red",

    },



  })


export default Tabnavigationscreen

