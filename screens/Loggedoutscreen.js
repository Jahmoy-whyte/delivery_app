import { StyleSheet,ImageBackground , BackHandler, Platform, StatusBar, SafeAreaView ,View ,TouchableOpacity,Text,Image} from 'react-native';

import { StatusBar as Expostatusbar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { getAuth, signInAnonymously } from "firebase/auth";
import { db } from "../Firebaseconfig";
import { doc, setDoc ,getDoc} from "firebase/firestore"; 
import Alertmessage from '../helpers/Alertmessage';
import React,{useState ,useContext} from 'react';
import { async } from '@firebase/util';
import { Userinfo_Context,Cartinfo_Context ,Userstate_Context} from "../GlobalContext/Context";



const Loggedoutscreen = ({navigation}) => {
  
const [processing ,setprocessing] = useState() 
const [userscreenstate,setuserscreenstate] = useContext(Userstate_Context)






const guestloging = () =>{
  setprocessing(true)
  const auth = getAuth();
  signInAnonymously(auth)
    .then(() => {
      // Signed in..
      createaccoutinfo(auth.currentUser.uid, "Guestmail@email.com")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Alertmessage("error occurred try again")
      // ...
    });

  }



 
const  exist = async(id)=>{
let bool = "default"
try{
  const docRef = doc(db, "Users", id);
  const docSnap = await getDoc(docRef) 

  if(!docSnap.exists()){
    bool = false
  }else {
    bool = true
  }


}catch(error){
  bool = "error"
}
return bool
}

  
const createaccoutinfo = async(id, email) =>{

 const bool =  await exist(id)
console.log(bool)
if (bool === false){
 try {
  await setDoc(doc(db, "Users", id ), {
      UserId: id,
      Email: email,
      FirstName: "Guest",
      LastName: "Guest",
      PhoneNumber:"1(876)1234567",
      Address:"",
      Cartitems:[],
      Favorite:[],
      Role:"Guest"
    });
    setprocessing(false)
    setuserscreenstate("loggedin")
  }catch(error){
    Alertmessage(error.code,"custom_error")
  }

}else if(bool === true){
  setprocessing(false)
  setuserscreenstate("loggedin")
}else{
  Alertmessage("error")
}

setprocessing(false)

}



        console.log("Logged out")
          
        let [fontsLoaded] =   useFonts ({
            'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
            'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
          });


          if  (!fontsLoaded)  {
            return false
          }

        return(
          //loggedoutimg
         // signupimg
      //loggedoutbackimg
             <ImageBackground  style = {styles.backimg} source={require("../assets/loggedoutimg.jpg")}   >
             <Expostatusbar style='light'/>
            
           
             
            <View style = {styles.headtxthold}>
             <Text style = {styles.slogan}>Food For People Who Love Food.</Text>
             </View>

             
             <View style = {styles.bottomnav}>
             </View>



             <SafeAreaView style = {styles.bottomcontain}>
         
            <TouchableOpacity style = {styles.Signupbtn}   onPress={() => navigation.navigate("signup")}>
            <Text style = {styles.btntxt} >Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.Loginbtn}  onPress={() => navigation.navigate("login")}>
            <Text  style = {styles.btntxt} >Login</Text>
            </TouchableOpacity>


              <View style = {styles.txthold}>
              <Text style = {styles.txt}>Or Login As</Text>
              <TouchableOpacity>
              <Text style = {styles.guesttxt} disabled = {processing} onPress ={()=>guestloging()}> Guest</Text>
              </TouchableOpacity>
              </View>  
             
             </SafeAreaView>
  
              </ImageBackground>
        
        
          )
        }
        



const styles = StyleSheet.create({



    title: {
        ...Platform.select ({
          ios: {},
          android:{marginTop: StatusBar.currentHeight}
        }),
        width:"100%",
        textAlign:"center",
        fontFamily:"Inter-Bold",
        color:"white",
        fontSize:24
      },

      
    backimg:{

      flex:1,
      backgroundColor:"white" 
    },


    headtxthold:{

        flex:1,
        justifyContent: 'flex-end',
        marginBottom:14
       // backgroundColor:"green",
    },

    slogan:{
         color:"white",
         fontSize:25,
         position:"absolute",

         marginLeft:10,
        
      
         fontFamily:"Inter-Bold",

        
    },

    Signupbtn:{

        height:48,
        marginTop:14,
        backgroundColor:"#F47A00",
        marginHorizontal:10,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:6
        


    },

    Loginbtn:{
        height:48,
        marginTop:14,
      borderWidth:1,
      borderColor:"white",
        marginHorizontal:10,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:6

    },

    bottomcontain:{


      ...Platform.select ({
        ios: {},
        android:{}
      }),

        backgroundColor: "rgba(0, 0, 0, 0.47)",
       // height:230,
        paddingVertical:14,
         width:"100%",
         justifyContent: 'flex-end',
         borderTopLeftRadius:6,
         borderTopRightRadius:6,

    },
    txthold:{
        
        flexDirection:"row",
        marginLeft:10,
        marginTop:14,
    },
    btntxt:{
        color:"white",
        fontSize:14,
        fontFamily:"Inter-Bold",
    },

    txt:{
        color:"white",
        fontSize:14,
        fontFamily:"Inter-Regular"
    },

    guesttxt:{
        color:"#F47A00",
        fontSize:14,
        fontFamily:"Inter-Bold"
    },





  });





  export default Loggedoutscreen