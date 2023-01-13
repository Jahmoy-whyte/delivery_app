import React, { useContext,useState,useEffect ,useCallback ,useRef,useMemo} from "react";
import {Button, Alert, Modal, TextInput ,StyleSheet, BackHandler, Text, Pressable, Image, View } from "react-native";
import { getAuth,signOut , createUserWithEmailAndPassword ,signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { db } from "../Firebaseconfig";
import { doc, setDoc , getDoc } from "firebase/firestore"; 
import { Userinfo_Context,Cartinfo_Context } from "../GlobalContext/Context";
import Loggedoutscreen from "./Loggedoutscreen";
import { auth1 } from "../Firebaseconfig";
import { StackActions } from '@react-navigation/native';


const Temploging = ({navigation}) => {


  const auth1 = getAuth();


  const [userinfo , setuserinfo] = useContext(Userinfo_Context)
  const [cartinfo , setcartinfo] = useContext(Cartinfo_Context)


  //console.log(email)
 

useEffect(() =>{

 const unsub =  onAuthStateChanged(auth1 , (data)=> {
    if (data && data.emailVerified) {
      Fn_getuser(data.uid)
    }else{
      navigation.dispatch(StackActions.replace('loggedout'))
    }

  })

return unsub()
},[])



/*
const fn_signin = async() => {
  await signInWithEmailAndPassword(auth, boxtxt.email, boxtxt.password)
    .then((userCredential) => {
      const user = userCredential.user;
      
      const wdata =  user.reload() 
      .then(()=>{
          if (user.emailVerified){
        
              Fn_getuser(user.uid)
             }else{
              passedmsg("email Not Verified")
             }
            }) .catch((error) => {
              passedmsg(error)
              setprocessing(false)
            })
  
      })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setprocessing(false)
      passedmsg(errorCode +"   "+ errorMessage)
    });
  }
*/

const Fn_getuser = async(userid) => {
  const docRef = doc(db, "Users", userid);
  const docSnap = await getDoc(docRef) 
  .then((newdata) => {
    let userdata = {
      userid: userid,
      fname:newdata.data().FirstName,
      lname:newdata.data().LastName,
      phone:newdata.data().PhoneNumber
    }

     setuserinfo(userdata)
       setcartinfo(newdata.data().Cartitems)
       navigation.dispatch(StackActions.replace('Tabnav'))
  }).catch((error)=>{
     // setprocessing(false)
      passedmsg(error)
  })  
}



const passedmsg = (msg)=>{
  alert(msg)
  }








return(

<View style = {{backgroundColor:"#7599F8", flex:1 ,     justifyContent:"center",
    alignItems:"center"}}>
<Image source ={require("../assets/splash.png")} /> 
</View>

)
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  backgroundColor:"lightgreen",
    marginTop: 22,

  
  },

  TextInputtxt:{
    marginHorizontal:10,
    marginVertical:10,
    height:50,
    backgroundColor:"green",
    padding: 10,
    borderWidth: 1,
  },

})

export default Temploging;