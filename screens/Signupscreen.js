import { StyleSheet,
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
import {Ionicons} from '@expo/vector-icons';
import { StatusBar as Expostatusbar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import Loadingscreen from '../components/Loadingscreen';
import Checkbox from 'expo-checkbox';
import React, { useState, useEffect } from 'react';
import { db } from "../Firebaseconfig";
import { doc, setDoc } from "firebase/firestore"; 
import { getAuth,createUserWithEmailAndPassword , sendEmailVerification } from "firebase/auth";
import { async } from '@firebase/util';

import Toast from 'react-native-toast-message';
import Alertmessage from '../helpers/Alertmessage';
import * as Linking from 'expo-linking';

const Signupscreen = ({navigation}) => {


// <SafeAreaView >
//<Text style = {styles.title}>App</Text>
//</SafeAreaView>




console.log("Signupscreen")
const auth = getAuth();
const [processing, setprocessing] = useState(false);
const [isChecked, setChecked] = useState(false);
const [boxtxt, setboxtxt] = useState({fname:"",lname:"",email:"",phone:"",password:""});


useEffect(() => {

const unsubscribe = navigation.addListener('beforeRemove', (e) => {
if (processing == true) {
  e.preventDefault();
}
    
  });
  return unsubscribe;
  
}, [navigation,processing]);





const createaccount = async (email , password) => {
  await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userid = userCredential.user.uid
        const email = userCredential.user.email
        createaccoutinfo(userid ,email) //call function
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setprocessing(false)
        Alertmessage(errorCode,"custom_error")
      });
    
}


const createaccoutinfo = async(id, email) =>{
  try {
    await setDoc(doc(db, "Users", id ), {
        UserId: id,
        Email: email,
        FirstName: boxtxt.fname.trim(),
        LastName:boxtxt.lname.trim(),
        PhoneNumber:boxtxt.phone.trim(),
        Address:"",
        Cartitems:[],
        Favorite:[],
        Role:"User"
      });
      verifi() //call function
    }catch(error){
      Alertmessage(error.code,"custom_error")
      setprocessing(false)
    }

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

      
            if (isChecked == true){

               if(boxtxt.fname === "" || boxtxt.fname.length < 3 ){
                Alertmessage("Please enter your firstname","custom_error") 
                return
               }else if (boxtxt.lname === "" || boxtxt.lname.length < 3 ){
                Alertmessage("Please enter your lastname","custom_error") 
                return
               }else if (validateEmail(boxtxt.email.trim())=== false){
                Alertmessage("Please enter your email","custom_error") 
                return
               }else if (boxtxt.phone === "" || boxtxt.phone.length < 3 ){
                Alertmessage("Please enter your phone number","custom_error") 
                return
               }else if (boxtxt.password === "" || boxtxt.password.length < 3 ){
                Alertmessage("Please enter your password","custom_error") 
                return
               }
               setprocessing(true)
               createaccount(boxtxt.email.trim(), boxtxt.password)
            }else{
              Alertmessage("Please Read And Agreed To Our Privacy Policy ","custom_error")
            }


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

   
          <KeyboardAvoidingView behavior='height' style ={{flex:1}}  >
         
            <SafeAreaView style ={styles.container} 
            >
         
            <Expostatusbar style='dark'  />
            <TouchableOpacity style ={styles.backbutton} onPress ={() =>navigation.goBack()} >
            <Ionicons name="chevron-back" size={20} color="black" />
           
            </TouchableOpacity>
           
            <ScrollView>
        

            
          
             <Image  style = {styles.topimg} resizeMode ={'stretch'} source={require("../assets/signup.png")} />

            

            <Text style ={styles.title}>Sign Up</Text>
            <Text style={styles.subtitle}>Please Sign Up To Continue</Text>
      

            <View style = {styles.fnandln}>
                <View style ={styles.fortxtboxhold1}>
                <Text style ={styles.textboxtxt} >First Name:</Text>
                <TextInput
                maxLength={50}
              editable = {processing == true?false:true} 
                style ={styles.textbox1} 
                onChangeText={(value) =>  {setboxtxt({ ...boxtxt ,  fname:value})}}
                />
                </View>

                <View style ={styles.fortxtboxhold1} >
                <Text style ={styles.textboxtxt} >Last Name:</Text>
                <TextInput 
                 maxLength={50}
               editable = {processing == true?false:true} 
                style ={styles.textbox1} 
                onChangeText={(value) =>  {setboxtxt({ ...boxtxt ,  lname:value})}}
                />
                </View>
            </View>


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
                <Text style ={styles.textboxtxt} >Phone:</Text>
                <TextInput 
                 maxLength={50}
              editable = {processing == true?false:true} 
                style ={styles.textbox} 
                onChangeText={(value) =>  {setboxtxt({ ...boxtxt ,  phone:value})}}
                keyboardType = {'number-pad'}
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

            <View style={styles.checkboxhold}>

                
            <Checkbox
            disabled = {processing} 
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? '#4630EB' : undefined}
            />
            
             <View style ={styles.wrapper}>
            <Text style ={styles.policytxt}>I Have Read And Agreed To Our    
            <Text style ={styles.policy} disabled = {processing} 
             onPress ={()=> Linking.openURL('https://johnwtaapptest.000webhostapp.com/privacypolicy.html')}
            > Privacy Policy </Text>
            </Text>
         

            </View>


            </View>


            
          



           </ScrollView>
         
       
   
         
    
        
      

           <TouchableOpacity disabled = {processing} style={styles.mainbtn} onPress = {() => verifytxt()}>

           {processing === false
              ?  <Text style={styles.mainbtntxt}>Sign Up</Text>
              : <ActivityIndicator style = {styles.loader} size="large" color="white" />
             }
 
           </TouchableOpacity>
           
           </SafeAreaView>
           </KeyboardAvoidingView>
   
          )
        }
        



const styles = StyleSheet.create({

  loader:{
    

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
        marginTop:14
    },
    subtitle:{
        fontSize:16,
        fontFamily:"Inter-Regular",
        marginLeft:10,
        color:"#7F7F7F",
        marginBottom:14
    },
    fnandln:{

        flexDirection:"row",
        marginTop:14,
        marginLeft:10
        
        
    },
    textbox1:{
      color:"black",
       marginRight:10,
        borderRadius:6,
        borderColor:"#7F7F7F",
        borderWidth:0.5,
       // height:35,
        padding:5,
        fontSize:14
        
    },
    fortxtboxhold1:{
        flex:1,
        //backgroundColor:"yellow"
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
    fontFamily:"Inter-Regular",

  
    },


    policytxt:{
   color:"black",
        fontSize:12,
    
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

    checkboxhold:{
        flexDirection:"row",
       
        marginHorizontal:10,
     //  backgroundColor:"red",
      marginVertical:14,
      alignItems:"center"
    },
    checkbox:{
    marginHorizontal:10,
    },

    wrapper:{

    flex:1,
   // backgroundColor:"yellow",

    }
    
});


  export default Signupscreen