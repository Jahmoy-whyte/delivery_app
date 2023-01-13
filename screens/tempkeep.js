import React, { useContext,useState,useEffect ,useCallback ,useRef,useMemo} from "react";
import {Button, Alert, Modal, TextInput ,StyleSheet, BackHandler, Text, Pressable, View } from "react-native";
import { getAuth,signOut , createUserWithEmailAndPassword ,signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { db } from "../Firebaseconfig";
import { doc, setDoc , getDoc } from "firebase/firestore"; 
import { Userinfo_Context,Cartinfo_Context } from "../GlobalContext/Context";



const Temploging = ({navigation}) => {
    const [txt, settxt] = useState("red");
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const auth = getAuth();

 
  const [userinfo , setuserinfo] = useContext(Userinfo_Context)
  const [cartinfo , setcartinfo] = useContext(Cartinfo_Context)


  //console.log(email)


useEffect(() =>{

 const hi =  onAuthStateChanged(auth , (data)=> {

    console.log(data)
    if (data != null) {
        
        Fn_getuser(data.uid)
 




    }else{
      setuserinfo("empty")
    }


  })

    
return hi
},[])





const Fn_getuser = async(userid) => {

  const docRef = doc(db, "Users", userid);
  const docSnap = await getDoc(docRef);
  let arr = [] 
  if (docSnap.exists()) {
  // console.log("Document data:", docSnap.data().Cartitems);


   arr[0] = userid
   arr[1] = docSnap.data().Name
   setuserinfo(arr)
   setcartinfo(docSnap.data().Cartitems)
 //alert(docSnap.data().Cartitems)
 navigation.navigate("Tabnav")

  } else {
    // doc.data() will be undefined in this case
    alert("No such account");
  }
  }

const createaccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        
        const user = userCredential.user;
        alert("created")
       // console.log(userCredential) 

        createaccoutinfo(user.uid)
       // navigation.navigate('Menu',{})
        // ...
      })
      .catch((error) => {
        alert("create error")
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    
}


const createaccoutinfo = async(id) =>{
//alert(id)
    await setDoc(doc(db, "Users", id ), {
        Name: "test user",
        Cartitems:""
      });

}



const signing = () => {
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    alert("Signed in ")
    const user = userCredential.user;
  //  console.log(user.uid)

    setuserinfo(user.uid)


 
    // ...
  })
  .catch((error) => {
    
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode +"   "+ errorMessage)
  });
}



const signout = () => {
signOut(auth).then(() => {
  alert("Sign-out successful")
}).catch((error) => {
  // An error happened.
});
}


if (userinfo== "empty") {
  return (

  <View style = {styles.centeredView}>

  <Text> {userinfo}</Text>
 
  <View style = {{marginVertical:10}} ></View>
    <Text>Email </Text>
    <TextInput  
    
    style = {styles.TextInputtxt}  
    onChangeText={setemail}
    value={email}
    />

    <Text>Password  </Text>
    <TextInput 
    style = {styles.TextInputtxt} 
     onChangeText={setpassword}
     value={password}
     />

    <Button title="createaccount" onPress={()=>createaccount()} />
  

    <View style = {{marginVertical:10}} ></View>
    <Button title="signing" onPress={()=>signing()} />
  
    <View style = {{marginVertical:10}} ></View>
    <Button title="signing Out" onPress={()=>signout()} />
    

    

   </View>

  )


}else{


    return true
}
};


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