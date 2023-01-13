//import { StatusBar } from 'expo-status-bar';
import { StyleSheet,ActivityIndicator, SafeAreaView, ScrollView , Text, Platform, StatusBar, View ,TouchableOpacity,Image } from 'react-native';
import {
AntDesign,
Ionicons,
Feather,
FontAwesome
} from '@expo/vector-icons';
import  { useState ,useContext} from 'react';
import { useFonts  } from 'expo-font';
import Loadingscreen from '../components/Loadingscreen';
import { Cartinfo_Context  , Userinfo_Context, Userstate_Context} from '../GlobalContext/Context';
import Toast from 'react-native-toast-message';
import { getAuth,signOut } from "firebase/auth";
import Guestsignup from '../components/Guestsignup';

import * as Linking from 'expo-linking';


const Accountscreen = ({navigation}) => {

 
     const [loading, setLoading] = useState(false);
     const [cartinfo , setcartinfo] = useContext(Cartinfo_Context)
     const [userinfo , setuserinfo] = useContext(Userinfo_Context)
     const [userscreenstate , setuserscreenstate] = useContext(Userstate_Context)
    let [fontsLoaded] =   useFonts ({
        'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
        'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
        });
        

        const auth = getAuth();
      

        const fnsignout = () => {
           // setLoading(true)
          signOut(auth).then(() => {
            //setLoading(false)
            setuserscreenstate("loggedout")
          }).catch((error) => {
           // setLoading(false)
            passedmsg("An error happened")
          });
         
         
          }

const passedmsg = (msg)=>{
  Toast.show({
    type: 'custom_error',
    text1: msg,
    text2: 'This is some something 👋'
  });
}





// ================= Guest =====================
if(userinfo === null || userinfo.role === "Guest"){
  return <Guestsignup/>
}
// ================= Guest =====================




if(!fontsLoaded){
    return <Loadingscreen/>
}


      return (
       
<SafeAreaView style={styles.container}>


<Text style = {styles.headertxt}>My Account</Text>

<ScrollView>
<View style = {styles.topsectionhold}>

<Image style = {styles.imgstyle} 
source={require('../assets/accountimg.png')}

   />
<Text style = {styles.displayusername} >{userinfo.fname +" "+ userinfo.lname}</Text>
<Text style = {styles.displayuseremail} >{userinfo.Email}</Text>

</View>



<TouchableOpacity style = {styles.optionsbtn}
onPress ={()=> navigation.navigate("myaccount")}>
<AntDesign name="user" size={24} color="black" />
    <Text style = {styles.optionsbtntxt}>My Account</Text>
</TouchableOpacity>



<TouchableOpacity style = {styles.optionsbtn}
onPress ={()=> navigation.navigate("address")}
>
<Ionicons name="location-outline" size={24} color="black" />
    <Text style = {styles.optionsbtntxt}>My Address</Text>
</TouchableOpacity>


<TouchableOpacity style = {styles.optionsbtn}
onPress ={()=> navigation.navigate("favorite")}
>
<FontAwesome name="bookmark-o" size={24}  color="black"/>
    <Text style = {styles.optionsbtntxt} >Favorites</Text>
</TouchableOpacity>


<TouchableOpacity style = {styles.optionsbtn} 
onPress ={()=> Linking.openURL('https://johnwtaapptest.000webhostapp.com/privacypolicy.html')}>
<Feather name="info" size={24} color="black" />
    <Text style = {styles.optionsbtntxt} >Help</Text>
</TouchableOpacity>





<Text style = {styles.privacypolicy}
 onPress ={()=> Linking.openURL('https://johnwtaapptest.000webhostapp.com/privacypolicy.html')}
>Click Here To Read About Our Privacy Policy </Text>




<TouchableOpacity style = {styles.logoutbtn} onPress ={()=> fnsignout()} >

{loading ===false?(
   <Text style = {styles.logouttxt} >Logout</Text>
):
<ActivityIndicator size={'large'} color={"white"} />
}
 

  
</TouchableOpacity>

</ScrollView>
 </SafeAreaView>



 

      );
    }
    
    const styles = StyleSheet.create({
        container: {
            ...Platform.select ({
              ios: {},
              android:{marginTop: StatusBar.currentHeight}
            }),
            flex: 1,
          //  marginHorizontal:10
          backgroundColor: 'white',
          },

  

    
                headertxt:{
                  fontFamily:"Inter-Bold",
                  fontSize:20,
                  textAlign:"center",
                  paddingVertical:14
              
      
                },

                imgstyle:{
                    width:80,
                    height:80,
                  //  borderRadius:50,
                   // borderWidth:0.5,
                    borderColor:"#7F7F7F",
                    marginBottom:14,
                },

                topsectionhold:{
                alignItems:"center",
                },

                displayusername:{
                
                    color:"black",
                    fontSize:16,
                    fontFamily:"Inter-Bold",
                     
                },

                displayuseremail:{
                    color:"#7F7F7F",
                    fontSize:12,
                    fontFamily:"Inter-Regular",
                    marginBottom:20

                },


                optionsbtn:{
                    flexDirection:"row",
                    borderRadius:6,
                    borderWidth:0.5,
                    borderColor:"black",
                    alignItems:"center",
                    paddingHorizontal:10,
                    marginHorizontal:10,
                    marginBottom:14,
                    height:65,
                },


                optionsbtntxt:{
                    color:"black",
                    fontSize:14,
                    fontFamily:"Inter-Bold",
                  //  paddingVertical:14,
                    marginLeft:5,
                },

                privacypolicy:{

                    textAlign:"center",
                    color:"#F47A00",
                    fontSize:12,
                    fontFamily:"Inter-Regular",
                    marginBottom:14,
                },

                logoutbtn:{
                backgroundColor:"#F47A00",
                padding:14,
                marginHorizontal:10,
                borderRadius:6,
                alignItems:"center",
                marginBottom:14,

                },

                logouttxt:{
                    fontFamily:"Inter-Bold",
                    color:"white",
                    fontSize:14,
                },
   
    });
  
  
    export default  Accountscreen
    