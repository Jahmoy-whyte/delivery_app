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
      KeyboardAvoidingView,
      BackHandler,
    ScrollView,} from 'react-native';
import {  Ionicons } from '@expo/vector-icons';
import { StatusBar as Expostatusbar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import Loadingscreen from '../components/Loadingscreen';
import Checkbox from 'expo-checkbox';
import React, { useState , useContext , useEffect, useCallback} from 'react';
import { signOut , createUserWithEmailAndPassword ,signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { db } from "../Firebaseconfig";
import { doc, setDoc , getDoc } from "firebase/firestore"; 
import { Userinfo_Context,Cartinfo_Context ,Userstate_Context} from "../GlobalContext/Context";
import { getAuth,sendPasswordResetEmail ,sendSignInLinkToEmail, sendEmailVerification } from "firebase/auth";
import { async } from '@firebase/util';
import { StackActions } from '@react-navigation/native';
import Alertmessage from '../helpers/Alertmessage';


const Resetpassword = ({navigation}) => {

const auth = getAuth();
const [processing, setprocessing] = useState(false);
const [boxtxt, setboxtxt] = useState("");


/*
useEffect(() => {

    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
    if (processing == true) {
      e.preventDefault();
    }   
      });
      return unsubscribe;
    }, [navigation,processing]);
    
*/
   

useEffect(() => {
        const backAction = () => {
            if (processing == true) {
               return true;
              }  
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
}, [processing]);
    
  



 
//divebackup152@gmail.com
    const sendlink = (email) =>{
        setprocessing(true)

    
       sendPasswordResetEmail(auth, email)
      .then(() => {
     
        Alertmessage("Link was sent to Email","custom_notify")
     
        setprocessing(false)
        navigation.navigate("loggedout")
      })
      .catch((error) => {
        console.log(error)
        Alertmessage(error.code,"custom_error")
        setprocessing(false)
      });
    
    }



    
       let [fontsLoaded] =   useFonts ({
           'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
           'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
         });

         const verifytxt =()=>{
              if (boxtxt === "" || validateEmail(boxtxt.trim())=== false){
               Alertmessage("Please enter your email","custom_error")
               return
              }
        
             sendlink(boxtxt.trim())
         }


        const validateEmail = (email) => {
           var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
             return re.test(email);
         };


        
         if  (!fontsLoaded)  {
           return <Loadingscreen />
         }
         
       // <Text style ={styles.backbuttontxt}>Back</Text>
       return(


           <SafeAreaView style ={styles.container} >
             <Expostatusbar style='light'  />
           <TouchableOpacity style ={styles.backbutton} 
           disabled = {processing}
           onPress ={() =>navigation.goBack()} >
           <Ionicons name="chevron-back" size={20} color="black" />
          
           </TouchableOpacity>


       
           <ScrollView>
       

       

           <Text style ={styles.title}>Reset Password</Text>
         
         <View style = {styles.infohold}>
         <Text style={styles.infoholdtitle}>Instructions</Text>
         <Text style={styles.subtitle}>
            

         Enter your email below after tap send code you will recivce 
         a link in your email open link to reset password
         </Text>
         </View>
          
     

          

           <View style ={styles.fortxtboxhold}>
               <Text style ={styles.textboxtxt} >Email:</Text>
               <TextInput 
                maxLength={100} 
                 editable = {processing == true?false:true} 
               style ={styles.textbox} 
               onChangeText={(value) =>  {setboxtxt(value)}}
               keyboardType = {'email-address'}
               />
           </View>
      
       





           
         
 


          </ScrollView>



 
          <TouchableOpacity disabled = {processing} style={styles.mainbtn} onPress = {() => verifytxt()}>

          {processing === false
             ?  <Text style={styles.mainbtntxt}>sendcode</Text>
             : <ActivityIndicator style = {styles.loader} size="large" color="white" />
            }

          </TouchableOpacity>

        
          
          </SafeAreaView>
       
         )
       }
       



const styles = StyleSheet.create({

    infohold:{
        borderColor:"#7F7F7F", 
        borderWidth:0.5,
        paddingHorizontal:10,
        borderRadius:6,
        marginHorizontal:10,
        paddingVertical:14, 
        marginTop:14,
    },
 

    infoholdtitle:{
        fontSize:14,
        fontFamily:"Inter-Bold",
        color:"Black",  
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
     color:"black",
       fontSize:20,
       fontFamily:"Inter-Bold",
       marginLeft:10,
      // marginTop:14
   },
   subtitle:{
       fontSize:12,
       fontFamily:"Inter-Regular",
       color:"#7F7F7F",  
   },
 

   textboxtxt:{

     color:"black" ,
     fontSize:14,
       fontFamily:"Inter-Regular",
       marginBottom:5,
       

   },
   fortxtboxhold:{
       marginTop:14,
   marginHorizontal:10
   },

   textbox:{
     color:"black",
      // width:131,
       borderRadius:6,
       borderColor:"#7F7F7F",
          borderWidth:0.5,
      // height:35,
       padding:5,
       fontSize:14
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
   resetpass:{
    marginVertical:14,
    alignItems:"center",
  //  backgroundColor:"green"
   }


   
});


 export default Resetpassword