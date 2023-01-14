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
    ScrollView,} from 'react-native';
import {  Ionicons } from '@expo/vector-icons';
import { StatusBar as Expostatusbar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import Loadingscreen from '../components/Loadingscreen';
import Checkbox from 'expo-checkbox';
import React, { useState , useContext , useEffect} from 'react';
import { signOut , createUserWithEmailAndPassword ,signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { db } from "../Firebaseconfig";
import { doc, setDoc , getDoc } from "firebase/firestore"; 
import { Userinfo_Context,Cartinfo_Context ,Userstate_Context} from "../GlobalContext/Context";
import { getAuth,sendPasswordResetEmail ,sendSignInLinkToEmail, sendEmailVerification } from "firebase/auth";
import { async } from '@firebase/util';
import { StackActions } from '@react-navigation/native';
import Alertmessage from '../helpers/Alertmessage';


const Logingscreen = ({navigation}) => {

const auth = getAuth();
const [processing, setprocessing] = useState(false);
const [boxtxt, setboxtxt] = useState({email:"",password:""});
const [userinfo , setuserinfo] = useContext(Userinfo_Context)
const [cartinfo , setcartinfo] = useContext(Cartinfo_Context)
const [userscreenstate,setuserscreenstate] = useContext(Userstate_Context)




useEffect(() => {

    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
    if (processing == true) {
      e.preventDefault();
    }   
      });
      return unsubscribe;
    }, [navigation,processing]);
    
 




  
const fn_signin = async() => {
  let trimemail = boxtxt.email
  trimemail=   trimemail.trim()
    await signInWithEmailAndPassword(auth, trimemail, boxtxt.password)
      .then((userCredential) => {
        const user = userCredential.user;
        
        const wdata =  user.reload() 
        .then(()=>{
            if (user.emailVerified){
          
              setprocessing(false)
              setuserscreenstate("loggedin")

               }else{
               // passedmsg("email Not Verified")
                verifi()
                setprocessing(false)
               }
              }) .catch((error) => {
                Alertmessage(error.code,"custom_error")
                setprocessing(false)
              })
    
        })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setprocessing(false)
        Alertmessage(error.code,"custom_error")
      });
    }




const verifi  = async() =>{
  await sendEmailVerification(auth.currentUser)
    .then(() => {
      setprocessing(false)
        navigation.navigate("emailverifi",{
        emailaddress:boxtxt.email.trim(),
        password:boxtxt.password,
        userid: auth.currentUser.uid,
      })
     })
     .catch((error) => {
      const errorCode = error.code;
      Alertmessage(errorCode,"custom_error")
      setprocessing(false)
     })
    }
  












    
       let [fontsLoaded] =   useFonts ({
           'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
           'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
         });

         const verifytxt =()=>{
              if (validateEmail(boxtxt.email.trim())=== false){
               Alertmessage("Please enter your email","custom_error")
               return
              }else if (boxtxt.password === "" || boxtxt.password.length < 3 ){
                Alertmessage("Please enter your password","custom_error") 
               
               return
              }
             setprocessing(true)
              fn_signin()
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
           <TouchableOpacity style ={styles.backbutton} onPress ={() =>navigation.goBack()} >
           <Ionicons name="chevron-back" size={20} color="black" />
          
           </TouchableOpacity>


       
           <ScrollView>
       

         
            <Image 


            style = {styles.topimg} resizeMode ={'stretch'} source={require("../assets/loginimg.png")} />

           

           <Text style ={styles.title}>Login</Text>
           <Text style={styles.subtitle}>Please Login To Continue</Text>
     

          

           <View style ={styles.fortxtboxhold}>
               <Text style ={styles.textboxtxt} >Email:</Text>
               <TextInput 
                maxLength={100} 
                 editable = {processing == true?false:true} 
               style ={styles.textbox} 
               onChangeText={(value) =>  {setboxtxt({ ...boxtxt ,  email:value})}}
               keyboardType = {'email-address'}
               />
           </View>
      
           <View  style ={styles.fortxtboxhold}>
               <Text style ={styles.textboxtxt} >Password:</Text>
               <TextInput 
                maxLength={100} 
                 editable = {processing == true?false:true} 
               style ={styles.textbox} 
               onChangeText={(value) =>  {setboxtxt({ ...boxtxt ,  password:value})}}
               secureTextEntry={true}
               />
           </View>

       
           
            <TouchableOpacity style ={styles.resetpass}  
                 onPress = {()=> navigation.navigate("resetpass")}>
           <Text style ={styles.policytxt} disabled ={processing}
      
           >Forgot Password?
           </Text>

           </TouchableOpacity>





           
         
 


          </ScrollView>



 
          <TouchableOpacity disabled = {processing} style={styles.mainbtn} onPress = {() => verifytxt()}>

          {processing === false
             ?  <Text style={styles.mainbtntxt}>Login</Text>
             : <ActivityIndicator style = {styles.loader} size="large" color="white" />
            }

          </TouchableOpacity>

        
          
          </SafeAreaView>
       
         )
       }
       



const styles = StyleSheet.create({

 
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
       marginTop:14
   },
   subtitle:{
       fontSize:16,
       fontFamily:"Inter-Regular",
       marginLeft:10,
       color:"#7F7F7F",
       marginBottom:14
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


   policy:{
   
   fontSize:12,
   color:"#F47A00",
   fontFamily:"Inter-Bold",

   marginLeft:10,
   },


   policytxt:{
    color:"#F47A00",
       fontSize:12,
       marginLeft:10,
       fontFamily:"Inter-Regular",
    
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


 export default Logingscreen