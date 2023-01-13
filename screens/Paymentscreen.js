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
      Modal,
      BackHandler
    ,
    ScrollView,} from 'react-native';

import { StatusBar as Expostatusbar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import Loadingscreen from '../components/Loadingscreen';
import Checkbox from 'expo-checkbox';
import React, { useState , useContext , useEffect, useReducer, useRef} from 'react';
import { signOut , createUserWithEmailAndPassword ,signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { db } from "../Firebaseconfig";
import { doc, setDoc,updateDoc , getDoc, collection, addDoc,Timestamp  } from "firebase/firestore"; 
import { Userinfo_Context,Cartinfo_Context ,DisplayGlobalMsg} from "../GlobalContext/Context";
import { getAuth, sendSignInLinkToEmail, sendEmailVerification } from "firebase/auth";
import { async } from '@firebase/util';
import { StackActions } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import { FontAwesome ,Ionicons ,AntDesign} from '@expo/vector-icons';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});



const initialState = {
  setcheckcash: false, 
  setcheckcard: false,
  showcardform:false,
  processing:false,
};
const reducer = (state,action)=>{


    switch (action.type){

    case"cashselect":
    return {
        ...state,
        setcheckcash:true,
        setcheckcard:false
    }

    case"cardselect":
    return {
        ...state,
        setcheckcash:false,setcheckcard:true
    }
    case"opencardform":
    return {...state,showcardform:true}
    case"closecardform":
    return {...state, showcardform:false}

    case"startprocessing":
    return {...state, processing:true}
    case"stopprocessing":
    return {...state, processing:false}





    default: throw new Error();

    }
}








const Paymentscreen = ({route,navigation}) => {
const {ordertype} = route.params
const auth = getAuth();


const [userinfo , setuserinfo] = useContext(Userinfo_Context)
const [cartinfo , setcartinfo] = useContext(Cartinfo_Context)
const [totalcalculation , settotalcalculation] = useState()
const [state , dispatch] = useReducer(reducer,initialState)

const [expoPushToken, setExpoPushToken] = useState('');
const [notification, setNotification] = useState(false);
const notificationListener = useRef();
const responseListener = useRef();




useEffect(() => {
  registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

  // This listener is fired whenever a notification is received while the app is foregrounded
  notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    setNotification(notification);
  });

  // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
  responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    console.log(response);
  });

  return () => {
    
    Notifications.removeNotificationSubscription(notificationListener.current);
    Notifications.removeNotificationSubscription(responseListener.current);
  };
}, []);



const  registerForPushNotificationsAsync = async()=> {
let token;
if (Device.isDevice) {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
   // alert('Please Enable push notification!');
    
    token ="denied";
    return token;
  }



  token = ((await Notifications.getExpoPushTokenAsync()).data)

  //alert(token)
  console.log(token +"=======");

} else {
  alert('Must use physical device for Push Notifications');
}

if (Platform.OS === 'android') {
  Notifications.setNotificationChannelAsync('default', {
    name: 'default',
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#FF231F7C',
  });
}

return token;
}







console.log("payment  ======")

useEffect(() =>{

  if (cartinfo.length > 0 ){
  
    let items;
    let itemsprice = 0
    cartinfo.forEach((iteminarr) =>{
      items=  iteminarr.split("@");
      itemsprice += parseInt(items[2])
    })
    settotalcalculation(itemsprice)
    }else{
      settotalcalculation(0) 
    }
},[])






useEffect(() => {

  const unsubscribe = navigation.addListener('beforeRemove', (e) => {
  if (state.processing === true ) {
    e.preventDefault();
  }   
    });
    return unsubscribe;
  }, [state.processing]);




//  navigation.navigate("ordersent")

const validateorder = async()=>{

  dispatch({type:"startprocessing"})

  try{
    const docRef = doc(db, "Users", userinfo.userid );
    const docSnap = await getDoc(docRef) 
    if(docSnap.exists()){
      
      let newarr = []
      let userdata = {
        userid: userinfo.userid,
        Email:docSnap.data().Email,
        fname:docSnap.data().FirstName,
        lname:docSnap.data().LastName,
        phone:docSnap.data().PhoneNumber,
        address:docSnap.data().Address,
        favorite:docSnap.data().Favorite,
        role:docSnap.data().Role,
      }
     
       newarr = docSnap.data().Cartitems
      if(newarr.length === 0){
        dispatch({type:"stopprocessing"})
        return passedmsg("carterror(notsame(0))")
      }else if (JSON.stringify(newarr) != JSON.stringify(cartinfo))
       {
        dispatch({type:"stopprocessing"})
        return passedmsg("carterror(notsame(1))")
       }else if (JSON.stringify(userdata) != JSON.stringify(userinfo)){
        dispatch({type:"stopprocessing"})
        return passedmsg("carterror(notsame(2))")
       }
       usercart_itemsdelete()
    
      }else{ 
        passedmsg("Cart Not Found")
        dispatch({type:"stopprocessing"})
      }

      }catch(error){
        passedmsg("error(1)")
        dispatch({type:"stopprocessing"})
      }

}


const usercart_itemsdelete = async()=>{
     try{
     const deletefn = doc(db, "Users", userinfo.userid);
     await updateDoc(deletefn, {
         Cartitems: []
     });
     addorder()
   }catch(error){
 //   console.log(error)
 passedmsg("error(2)")
      dispatch({type:"stopprocessing"})
     }
   
}


const addorder =async()=>{
 

  let s_genid = Timestamp.now().seconds
  let ns_genid = Timestamp.now().nanoseconds
   s_genid = s_genid.toString()
   ns_genid= ns_genid.toString()
  let orderidgenerated = 
  s_genid.substring(s_genid.length - 2,s_genid.length)
  +""+   ns_genid.substring(0,2) 
  +""+ userinfo.fname.substring(0,1)
  +""+ userinfo.lname.substring(0,1)

  orderidgenerated = "#" + orderidgenerated.toLocaleUpperCase()


   
  try {
    const sendorder = await addDoc( collection(db, "Orders"),{
      Customer_id: userinfo.userid,
      Customer_name: userinfo.fname +"  "+ userinfo.lname,
      Customer_phone: userinfo.phone,
      Order_id: orderidgenerated,
      Customer_address:"none",
      Order_time: Timestamp.now(),

      Customer_paymentmethod:
      state.setcheckcard === true
      ?"Paid by card"
      : state.setcheckcash === true
      ?"Cash"
      :"Payment Not Known",

      Order_type: ordertype,
      Customer_order:cartinfo,
      Order_status:"Sent",
      Customer_notifytoken: expoPushToken
    });

    //alert("done")


 
    let newarr = [...cartinfo]
    setcartinfo([])
    navigation.navigate("ordersent",{
      paymentmethod: state.setcheckcard === true
      ?"Paid by card"
      : state.setcheckcash === true
      ?"Cash on " + ordertype
      :"Payment Not Known",
      copycartinfo: newarr,
      passedorderid: orderidgenerated,
    })

    dispatch({type:"stopprocessing"})

  } catch(error){
       passedmsg("error(order not sent)")
       dispatch({type:"stopprocessing"})
       setcartinfo([])
  }

}



const passedmsg = (msg)=>{
  Toast.show({
    type: 'custom_notify',
    text1: msg,
    text2: 'This is some something 👋'
  });
}






       let [fontsLoaded] =   useFonts ({
           'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
           'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
         });

     
        
         if  (!fontsLoaded)  {
           return <Loadingscreen />
         }


         if (expoPushToken == "denied"){
          return(
            <SafeAreaView style ={styles.container} >
                <Expostatusbar style='dark'  />


                <View style = {styles.header}>
              <TouchableOpacity style ={styles.backnavicon} onPress ={() =>navigation.goBack()} >
              <Ionicons name="chevron-back" size={20} color="black" />
              </TouchableOpacity>
              <Text style = {styles.headertxt}>Payment</Text>
              </View>
                <View style = {{flex:1, justifyContent:"center", alignItems:"center"}} 
               >
  
         
              
                  
                <Text>Please Enable Noification To Continue</Text>
                
                <TouchableOpacity style = {{backgroundColor:"#F47A00",borderRadius:6, marginTop:5}}
                 onPress={()=>{
                  registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
                  }}
                >
                <Text style = {{ paddingHorizontal:14, paddingVertical:10,color:"white",
                fontFamily:"Inter-Regular", fontSize:12}}
               
                >Try Again</Text>
                </TouchableOpacity>
               
                </View>
            </SafeAreaView>
          )
         }else{

       return(

           <SafeAreaView style ={styles.container} >
            <Expostatusbar style='dark'  />
         
            <View style = {styles.header}>
            <TouchableOpacity style ={styles.backnavicon} onPress ={() =>navigation.goBack()} >
            <Ionicons name="chevron-back" size={20} color="black" />
            </TouchableOpacity>
            <Text style = {styles.headertxt}>Payment</Text>
            </View>


       

            <View style = {styles.totalhold}>

            <Text style = {styles.totaltxt}>${totalcalculation}</Text>

            </View>
        
        <ScrollView style = {{flex:1 ,backgroundColor:"white"}}>
            <TouchableOpacity style = {styles.paymentmethod} onPress ={()=> dispatch({type:"cashselect"}) }>

            <View style = {styles.paymentmethodiconcontainer}>
            <FontAwesome name="money" size={24} color="#7F7F7F"  style = {styles.paymentmethodicon}/>
            <View style = {styles.titleandsubtitlehold}>
            <Text style = {styles.paymentmethodtitle}>Cash</Text>
            <Text style = {styles.paymentmethodsubtitle}>Pay In Cash On Delivery Or Pick </Text>
            </View>

            </View>
      
            <Checkbox value={state.setcheckcash} color={"red"} />
          
            </TouchableOpacity>

            <View style = {{height:14}}> 
            
            </View>


            <TouchableOpacity style = {styles.paymentmethod} onPress ={()=> dispatch({type:"cardselect"})}>

                <View style = {styles.paymentmethodiconcontainer}>
                <AntDesign  name="creditcard" size={24}  color="#7F7F7F" style = {styles.paymentmethodicon}/>
                <View>
                <Text style = {styles.paymentmethodtitle}>Card</Text>
                <Text style = {styles.paymentmethodsubtitle}>Pay Using Credit Card</Text>
                </View>

                </View >
      
                <Checkbox value={state.setcheckcard} color={"red"} />
              
            </TouchableOpacity>

  <View style = {{height:14}}> 
            
            </View>

            {state.setcheckcard == true?(
            <View>
            <Text style = {styles.paytxt}>Card</Text>
            <TouchableOpacity style = {styles.addcardbtn} onPress = {()=> dispatch({type: "opencardform"})}>
            <Text style = {styles.addcardbtntxt} >Add Card</Text>
            </TouchableOpacity>
            </View>
            ):null}
          


           


    
          </ScrollView>


          <TouchableOpacity disabled ={state.processing}  style ={styles.bottombarcontainer} onPress={()=> {
            
            if (state.setcheckcard ===false && state.setcheckcash === false){
              return passedmsg("Please select a payment method")
            }
        
            validateorder()

          //console.log(Timestamp.now().nanoseconds)

            }} >
              {state.processing === false
              ?(<Text style ={styles.txt} >Order</Text>
              ):<ActivityIndicator size={'large'} color={"white"} />
              }
        </TouchableOpacity>
         

        
          <Modal animationType='slide' visible = {state.showcardform} onRequestClose ={()=> dispatch({type:"closecardform"})} >
          
          <ScrollView style = {styles.textInputcontainer}>
            <SafeAreaView>
          <View style = {styles.header}>
            <TouchableOpacity style ={styles.backnavicon} onPress ={()=> dispatch({type:"closecardform"})}>
            <Ionicons name="chevron-back" size={20} color="black" />
            </TouchableOpacity>
            <Text style = {styles.headertxt}>Card Info</Text>
            </View>

            <View style= {styles.creditcard}>

                <View style= {styles.creditcardtophold}>
                <View style= {styles.creditcardtoptxthold}>  
                <Text style= {styles.creditcardtoptxtleft}>Card</Text>
                </View>
                <Text style= {styles.creditcardtoptxtright}>Bank</Text>
                </View>


                <View >
                <Text style= {styles.cardnum}>**** **** **** 0000</Text>
                </View>

                <View>
                <Text style= {styles.carddate}>00/00</Text>
                </View>
            </View>




               
                <View>
                <Text style= {styles.txtboxtxt}>Card holder Name:</Text>
                <TextInput 
                  placeholder={"Name"}
                  placeholderTextColor={"gray"}
                style= {styles.txtbox}/>
                </View>

                <View>
                <Text style= {styles.txtboxtxt}>Card Number:</Text>
                <TextInput  
                  placeholder={"0000 0000 0000 0000"}
                  placeholderTextColor={"gray"}
                style= {styles.txtbox}/>
                </View>

                <View style= {styles.txtboxcontianer}>

                <View style= {styles.txtboxsecondcontianer}>
                <Text style= {styles.txtboxtxt}>Expiration date:</Text>
                <TextInput  
                placeholder={"00/00"}
                placeholderTextColor={"gray"}
                style= {styles.txtboxsmall}/>
                </View>


                <View  style= {styles.txtboxspacing}></View>
              

                <View style= {styles.txtboxsecondcontianer}>
                <Text style= {styles.txtboxtxt}>CVC:</Text>
                <TextInput 
                placeholder={"0000"}
                placeholderTextColor={"gray"}
                style= {styles.txtboxsmall}/>
                </View>
                </View>
                </SafeAreaView>
                </ScrollView>

                <TouchableOpacity   style ={styles.bottombarcontainer} onPress ={()=> dispatch({type:"closecardform"})} >
            <Text style ={styles.txt} >Save</Text>
        </TouchableOpacity>
    
          </Modal>
         
      
          </SafeAreaView>
       
         )

      }
       }
       



const styles = StyleSheet.create({


    textInputcontainer:{
        marginVertical:14,
        marginHorizontal:10,
    },

    txtboxtxt:{
        fontFamily:"Inter-Regular",
        fontSize:14,
        color:"black",
    },

    txtbox:{
      //  marginTop:5,
      textAlign:"center",
      fontFamily:"Inter-Regular",
        borderColor:"#7F7F7F",
        borderWidth:0.5,
        borderRadius:6,
        paddingVertical:8,
        marginBottom:14
    },

    txtboxcontianer:{
        flexDirection:"row",
        flex:1,
        //backgroundColor:"red"

    },

    txtboxsmall:{
        textAlign:"center",
        fontFamily:"Inter-Regular",
        borderColor:"#7F7F7F",
        borderWidth:0.5,
        borderRadius:6,
        
        paddingVertical:8,
        
    },
    txtboxsecondcontianer:{
        flex:1,

    },

    txtboxspacing:{
        width:10,
       // backgroundColor:"green"

    },
    //===================================
    creditcard:{
    backgroundColor:"#0962B5",
    marginHorizontal:10,
    borderRadius:10,
    paddingHorizontal:14,
 
    },

    creditcardtophold:{
    flexDirection:"row",
    justifyContent:"space-between",
    paddingVertical:14
    },
    creditcardtoptxthold:{
    backgroundColor:"white",
    borderRadius:6,
    },
    creditcardtoptxtleft:{
        fontFamily:"Inter-Bold",
        fontSize:14,
        color:"#0962B5",
        padding:6
    },

    creditcardtoptxtright:{
        fontFamily:"Inter-Bold",
        fontSize:14,
        color:"white",
        padding:6
    },
    cardnum:{
        fontFamily:"Inter-Regular",
        fontSize:14,
        color:"white",
        textAlign:"center",
        paddingVertical:14
    },
    carddate:{
        fontFamily:"Inter-Regular",
        fontSize:14,
        color:"white",
        textAlign:"center",
        paddingVertical:14
    },


    //=================================
 
   container: {
       ...Platform.select ({
         ios: {},
         android:{marginTop: StatusBar.currentHeight}
       }),
       flex: 1,
       backgroundColor: 'white',
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


     totalhold:{
          marginHorizontal:10,
          paddingBottom:14,
         },
      
         totaltxt:{
            color:"#F47A00",
            fontSize:30,
            fontFamily:"Inter-Bold",
            textAlign:"center"
             },

             paymentmethodicon:{
             marginRight:10

             },
             paymentmethodiconcontainer:{
                flexDirection:"row",
                alignItems:"center",
              //  backgroundColor:"purple",
                flex:1,
             },
             paymentmethod:{
               // margin:5,
                borderColor:"#7F7F7F",
                marginHorizontal:10,
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"space-between",
                paddingVertical:14,
                paddingHorizontal:10,
                borderWidth:0.5,
                borderRadius:6
             },

             paymentmethodtitle:{
                color:"black",
                fontSize:14,
                fontFamily:"Inter-Bold",
            },

            paymentmethodsubtitle:{
                color:"#7F7F7F",
                fontSize:12,
                fontFamily:"Inter-Regular",
               
               
            },

            titleandsubtitlehold:{

              flex:1
             },
            
        
            addcardbtn:{

                alignItems:"center",

                backgroundColor:"#F47A00",  
                marginHorizontal:10,
             //   marginVertical:10,
                padding:10,
                borderRadius:6,
                
            },

            addcardbtntxt:{

                color:"white",
                fontSize:14,
                fontFamily:"Inter-Bold",
                
            },
            paytxt:{
                marginHorizontal:10,
                color:"black",
                fontSize:16,
                fontFamily:"Inter-Bold",
               // marginVertical:14,
               marginBottom:14
            },











   bottombarcontainer:{
    backgroundColor:"#F47A00",  
    marginHorizontal:10,
    marginVertical:10,
    padding:20,
    borderRadius:6,
    alignItems:"center",
    paddingHorizontal:10,
  //  position:"absolute",
  //  bottom:0,
  },

 


  txt:{
    color:"white",
    fontFamily:"Inter-Bold",
    fontSize:14,

  },

   
});


 export default Paymentscreen