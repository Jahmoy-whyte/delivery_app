//import { StatusBar } from 'expo-status-bar';
import { StyleSheet,TextInput,ActivityIndicator, ScrollView , SafeAreaView, Text, Platform, StatusBar, View ,TouchableOpacity,Image } from 'react-native';
import {

Ionicons,

} from '@expo/vector-icons';
import  { useState ,useContext ,useRef } from 'react';
import {db} from "../Firebaseconfig";
import { 
doc,
updateDoc
} from "firebase/firestore"; 
import { useFonts  } from 'expo-font';
import Loadingscreen from '../components/Loadingscreen';
import {  Userinfo_Context} from '../GlobalContext/Context';
import Alertmessage from '../helpers/Alertmessage';



const Myaccountscreen = ({navigation}) => {

 
 
     const [userinfo , setuserinfo] = useContext(Userinfo_Context)
   //  const [userdata_info, userdata_cart , userdata_loading] =  useGetuserinfo(false)
     const [processing, setprocessing] = useState(false)
     const [boxtxt,setboxtxt] =useState({
        fname:userinfo.fname,
        lname:userinfo.lname,
        phone:userinfo.phone,
        updates:1,
        passresets:1
    })    
const ts = useRef()

     let [fontsLoaded] =   useFonts ({
        'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
        'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
        });

      




const FUNC_update_users_info = async()=>{

if(boxtxt.updates > 3) {
    Alertmessage("Too many updates try again later","custom_error")
    return
}
    setprocessing(true)
 try {
    const updatecart = doc(db, "Users", userinfo.userid);
    await updateDoc(updatecart, {
        FirstName:boxtxt.fname.trim(),
        LastName:boxtxt.lname.trim(),
        PhoneNumber:boxtxt.phone.trim(),
    });
    Alertmessage("Saved","custom_success")
    setboxtxt(prev =>({...prev, 
        updates:boxtxt.updates + 1
     
    }))

    setuserinfo(prev =>({...prev, 
        fname:boxtxt.fname.trim(),
        lname:boxtxt.lname.trim(),
        phone:boxtxt.phone.trim(),
    }))
    setprocessing(false)
  } catch(error){
    Alertmessage("Error trying to update user infomation","custom_error")
    setprocessing(false)
  }
 }





 


if(!fontsLoaded){
    return <Loadingscreen/>
}


      return (
       
<SafeAreaView style={styles.container}>


<View style = {styles.header}>
            <TouchableOpacity style ={styles.backnavicon} onPress ={() =>navigation.goBack()} >
            <Ionicons name="chevron-back" size={20} color="black" />
            </TouchableOpacity>
            <Text style = {styles.headertxt}>My Account</Text>
            </View>

<ScrollView>




<View style = {styles.topsectionhold}>



<Image style = {styles.imgstyle} 
source={require('../assets/accountimg.png')}

   />
<Text style = {styles.displayusername} >{userinfo.fname +" "+ userinfo.lname}</Text>
<Text style = {styles.displayuseremail} >{userinfo.Email}</Text>

</View>
        

<View style ={styles.fortxtboxhold}>
    <Text style ={styles.textboxtxt} >First Name:</Text>
    <TextInput 
     maxLength={30} 
      editable = {processing == true?false:true} 
    style ={styles.textbox} 
    onChangeText={(value) =>  {setboxtxt({ ...boxtxt ,  fname:value})}}
    value = {boxtxt.fname}
    />
</View>

<View  style ={styles.fortxtboxhold}>
    <Text style ={styles.textboxtxt} >Last Name:</Text>
    <TextInput 
     maxLength={30} 
      editable = {processing == true?false:true} 
    style ={styles.textbox} 
    onChangeText={(value) =>  {setboxtxt({ ...boxtxt ,  lname:value})}}
    value = {boxtxt.lname}
    />
</View>

<View  style ={styles.fortxtboxhold}>
    <Text style ={styles.textboxtxt} >Phone Number:</Text>
    <TextInput 
     maxLength={30} 
      editable = {processing == true?false:true} 
    style ={styles.textbox} 
    onChangeText={(value) =>  {setboxtxt({ ...boxtxt ,  phone:value})}}
    value = {boxtxt.phone}
    keyboardType = {'numeric'}
    />
</View>







<TouchableOpacity disabled = {processing} style={styles.mainbtn} 
onPress = {() => FUNC_update_users_info()}>

{processing === false
  ?  <Text style={styles.mainbtntxt}>Save</Text>
  : <ActivityIndicator style = {styles.loader} size="large" color="white" />
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
          resetpass:{
            color:"black" ,
            textAlign:"center",
            marginTop:14
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
              marginTop:14
              
          },
          mainbtntxt:{
              fontFamily:"Inter-Bold",
              fontSize:14,
              color:"white",
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
          //  marginBottom:20

        },


        backnavicon:{
            //  flexDirection:"row",
            left:10,
            backgroundColor:"white",
             position:"absolute",
             // marginHorizontal:10,
             alignItems:"center",
             borderRadius:6,
             borderColor:"black",
             borderWidth:0.5,
             justifyContent:"center",
             width:30,
            height:30,
              },
    
              header:{
                flexDirection:"row",
                 alignItems:"center",
                 paddingVertical:14,
                 justifyContent:"center"
              },
              headertxt:{
                fontFamily:"Inter-Bold",
                fontSize:20,
            
    
              },
    
    
    
       backbuttontxt:{
           fontFamily:"Inter-Bold",
           fontSize:14,
           
       },
    
    
   
    });
  
  
    export default  Myaccountscreen
    