import { StyleSheet,
    ImageBackground ,
     TextInput ,
      Platform, 
      StatusBar, 
      SafeAreaView ,
      View ,
      TouchableOpacity,
      Text,
      Image,
      ActivityIndicator,
    ScrollView,} from 'react-native';
import {  Ionicons ,MaterialIcons} from '@expo/vector-icons';
import { StatusBar as Expostatusbar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import Loadingscreen from '../components/Loadingscreen';
import Checkbox from 'expo-checkbox';
import React, { useState , useContext, useEffect} from 'react';
import { signOut , createUserWithEmailAndPassword ,signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { db } from "../Firebaseconfig";
import { doc, setDoc , getDoc } from "firebase/firestore"; 
import { Userinfo_Context,Cartinfo_Context,Userstate_Context } from "../GlobalContext/Context";
import { getAuth, sendSignInLinkToEmail, sendEmailVerification } from "firebase/auth";
import { async } from '@firebase/util';
import { StackActions } from '@react-navigation/native';
import Errormsg from '../components/Errormsg';
import Toast from 'react-native-toast-message';
import Alertmessage from '../helpers/Alertmessage';


const Emailverificationscreen = ({route,navigation}) => {
    
const {emailaddress,password,userid} = route.params;


//console.log("render  " + i++)
let [fontsLoaded] =   useFonts ({
    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
  });
  const [sendcount, setsendcount] = useState(0);
  const [processing, setprocessing] = useState(false);
  const [userinfo , setuserinfo] = useContext(Userinfo_Context)
  const [cartinfo , setcartinfo] = useContext(Cartinfo_Context)
  const [userscreenstate,setuserscreenstate] = useContext(Userstate_Context)
  const [showerror, setshowerror] = useState("");
  const auth = getAuth();






  useEffect(() => {

    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
    if (processing == true) {
      e.preventDefault();
    }   
      });
      return unsubscribe;
    }, [navigation,processing]);
    
    



const shotenemail =(e) =>{
 e = e.substring(0, 9) + "...";
return e
}



const sendcode  = async() =>{
    setprocessing(true)


    await sendEmailVerification(auth.currentUser)

      .then(() => {
        setprocessing(false)
        Alertmessage("code sent","custom_notify")
       })
       .catch((error) => {
        const errorCode = error.code;
        Alertmessage(errorCode,"custom_error")
        setprocessing(false)
       })
    
    }


    const fn_login = async() =>{
    setprocessing(true)

    try{
    const unsub = onAuthStateChanged(auth, (data)=> {
    const wdata =  data.reload() 
    .then(()=>{
        if (data.emailVerified){
            Fn_signing()
           }else{
            Alertmessage("Email Not Verified","custom_error")
           }
          }) .catch((error) => {
            Alertmessage(error.code,"custom_error")
            setprocessing(false)
          })

    })


    setprocessing(false)
    return unsub

    }catch(error){
      Alertmessage(error.code,"custom_error")
        setprocessing(false)
    }
   
}


const Fn_signing = async() => {
    await signInWithEmailAndPassword(auth, emailaddress, password)
      .then((userCredential) => {
        setuserscreenstate("loggedin")
        setprocessing(false)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setprocessing(false)
        Alertmessage(errorCode,"custom_error")
      });
    }






 
if  (!fontsLoaded)  {
return <Loadingscreen />
}





      



        return(


            <SafeAreaView style ={styles.container} >
               <Expostatusbar style='light'  />
            <TouchableOpacity style ={styles.backbutton} onPress ={() =>navigation.goBack()} >
            <Ionicons name="chevron-back" size={20} color="black" />
           
            </TouchableOpacity>
            <ScrollView>
        

            
          
             <Image  style = {styles.topimg} resizeMode ={'stretch'} source={require("../assets/sentemail.png")} />

            

            <Text style ={styles.title}>Email Verification</Text>

      

             <View style ={styles.fortxt} >

            <Text style ={styles.policy}>An Email link Has Been Sent To
            <Text style ={styles.policytxt}> {shotenemail(emailaddress)}</Text>
            <Text style ={styles.policy}> Please Click The Link In You Email To Verifiy Your Email Address.</Text>
            
            </Text>
           
            </View>

            <View style ={styles.fortxt} >
            <Text style ={[styles.policy,{color:"black"}]}>Not See Your Code?
            
            <Text disabled ={processing} style ={[styles.policytxt,{color:"#F47A00"}]} onPress ={() => sendcode()}> Send Again</Text>
            
 
            </Text>
           

    
            </View>



        


            
          



           </ScrollView>

           {showerror != ""?(        
          <Errormsg msg={showerror} />
          ):null}

       
           <TouchableOpacity disabled ={processing} style={styles.mainbtn} onPress = {() => fn_login()}>
           {processing === false
              ?  <Text style={styles.mainbtntxt}>Login</Text>
              : <ActivityIndicator style = {styles.loader} size="large" color="white" />
             }
           </TouchableOpacity>
           
           </SafeAreaView>
        
          )
        }
        



const styles = StyleSheet.create({

    fortxt:{
//backgroundColor:"green",
flexDirection:"row",
    flexWrap:'wrap',
    marginHorizontal:10,
marginVertical:14
    },
    container: {
        ...Platform.select ({
          ios: {},
          android:{marginTop: StatusBar.currentHeight}
        }),
        flex: 1,
        backgroundColor: 'white',
      },


    backbutton:{
  //  flexDirection:"row",
    marginVertical:14,
    marginLeft:10,
   alignItems:"center",
   borderRadius:6,
   borderColor:"#7F7F7F",
   borderWidth:0.5,
   justifyContent:"center",
   width:30,
  height:30,
    },

    backbuttontxt:{
        fontFamily:"Inter-Bold",
        fontSize:14,
        
    },

    topimg:{

        height:131,
        width:200,
        alignSelf:"center",
        marginVertical:14
    },
    title:{
        fontSize:20,
        fontFamily:"Inter-Bold",
       marginHorizontal:10,
       textAlign:"center",
        marginTop:14
    },
    subtitle:{
        fontSize:16,
        fontFamily:"Inter-Regular",
        marginHorizontal:10,
       textAlign:"center",
        marginLeft:10,
        color:"#7F7F7F",
        marginBottom:14
    },
    

    policy:{
    
    fontSize:12,
    color:"#7F7F7F",
    fontFamily:"Inter-Regular",

    marginLeft:10,
    },


    policytxt:{
        
        color:"black",
        fontSize:12,
        marginLeft:10,
        fontFamily:"Inter-Bold",
     
        },

    mainbtn:{
        backgroundColor:"#F47A00",
        height:48,
        borderRadius:6,
        marginHorizontal:10,
        justifyContent:"center",
        alignItems:"center",
        marginBottom:14
        
    },
    mainbtntxt:{
        fontFamily:"Inter-Bold",
        fontSize:14,
        color:"white",
    },



});


  export default Emailverificationscreen