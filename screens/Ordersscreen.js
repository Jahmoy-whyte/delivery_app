import { StatusBar as Expostatusbar } from 'expo-status-bar';
import { StyleSheet,ActivityIndicator,Modal, LogBox,SafeAreaView, Text, FlatList, Platform, StatusBar, View ,TouchableOpacity,Image ,Pressable} from 'react-native';
import {
AntDesign,
Ionicons,
Feather
} from '@expo/vector-icons';
import react , {useEffect , useState ,useContext ,useRef ,useCallback ,useMemo} from 'react';
import {db} from "../Firebaseconfig";
import { 
collection, 
query, 
where,
getDocs,
getDoc,
doc,
limit,
arrayRemove, 
updateDoc,
 onSnapshot,
} from "firebase/firestore"; 
import { useFonts  } from 'expo-font';
import Loadingscreen from '../components/Loadingscreen';
import { Cartinfo_Context  , Userinfo_Context, Userstate_Context} from '../GlobalContext/Context';
import Cartcards from '../components/Cartcards';
import BottomSheet,{BottomSheetView , BottomSheetScrollView,BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import Dishinfoscreen from './Dishinfoscreen';
import { GestureHandlerRootView, ScrollView  } from 'react-native-gesture-handler';
import { async } from '@firebase/util';
import Errormsg from '../components/Errormsg';
import Toast from 'react-native-toast-message';
import { getAuth,signOut , createUserWithEmailAndPassword ,signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import Ordersentscreen from './Ordersentscreen';
import Orderscards from '../components/Orderscards';
import Imageandtext from '../components/Imageandtext';
import Guestsignup from '../components/Guestsignup';


const Orderscreen = ({navigation}) => {

  //LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  //LogBox.ignoreAllLogs();//Ignore all log notifications



  const [userinfo, setuserinfo] = useContext(Userinfo_Context)
     const [orderdata, setorderdata] = useState(
      {data:"",
       loading:true,
       showmodel:false,
       cart:[],
       paytype:"",
       totaltopay:"",
       ORDERID:""
      }
      );

   
    let [fontsLoaded] =   useFonts ({
        'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
        'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
        });
   


        let auth = getAuth()

useEffect(()=>{

    if (userinfo === null || userinfo.role === "Guest") return
    const q = query(collection(db, "Orders"), where("Customer_id", "==", auth.currentUser.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const arr = [];
      querySnapshot.forEach((doc) => {
          arr.push(doc.data());
      });

      setorderdata(prev => ({...prev,loading:false, data:arr}))
  
    //console.log( arr)
  
    });

   return unsubscribe
},[])





const fnshowmodelwithdata = useCallback((
  cartdata,
  paytype,
totaltopay,
ORDERID
)=>{
console.log("cartdata")
  setorderdata(prev => 
    ({...prev,
    showmodel:true,
    cart:cartdata,
    paytype:paytype,
    totaltopay:totaltopay,
    ORDERID:ORDERID
  }))
},[])



// ================= Guest =====================
if(userinfo === null || userinfo.role === "Guest"){
  return <Guestsignup/>
}
// ================= Guest =====================




if(!fontsLoaded ){
    return <Loadingscreen/>
}


//console.log(orderdata.data)

      return (
       
<SafeAreaView style={styles.container}>

<Text style = {styles.headertxt}>My Orders</Text>
<View style = {styles.options}>

<TouchableOpacity  style = {styles.pickup} >
<Text style = {styles.pickuptxt}>Current Order</Text>
</TouchableOpacity>


<TouchableOpacity  style = {styles.delivery}>
<Text style = {styles.deliverytxt}>Order Histroy</Text>
</TouchableOpacity>

</View>






{orderdata.loading === true ?(
 <Loadingscreen/>
):(
<View style = {{flex:1,backgroundColor:"white"}}>

{orderdata.data.length > 0 ?(
   
<FlatList 
data={orderdata.data}
renderItem ={({item})=>{
 // console.log(item)
return(
  <Orderscards  
   orderid={item.Order_id}  
  oderstatus ={item.Order_status}
  cartarr ={item.Customer_order}
  delivreytype ={item.Order_type}
  paymenttype  ={item.Customer_paymentmethod}
  fn_passdata ={fnshowmodelwithdata}
  />
)
}}
/>
):
<Imageandtext image={require("../assets/nodata.png")}  title = {"No Orders"} />

}




</View>

)}

<Modal animationType='slide' visible = {orderdata.showmodel} onRequestClose ={()=>  setorderdata(prev => ({...prev,showmodel:false}))}  >


<SafeAreaView style ={{flex:1,backgroundColor:"white"}}>
<ScrollView >
 
         
      

           
          
       
         <Text style = {styles.titletxt}>Order Details</Text>
     

          
           <View style ={styles.alltxthold}>
           <Text style ={styles.title}>Items</Text>
          
           {


           orderdata.cart.map((x,index)=>{

            let item= x.split("@")
            return(
            <View style ={styles.subtitlehold}>
            <Text style ={styles.subtitle} key={index}>{item[0]}(x{item[1]})</Text>
            <Text style ={styles.subtitle2} key={index +"w"}>${item[2]}</Text>
            </View>
            )
            })}
    
         
           </View>

           <View style ={styles.alltxthold}>
           <Text style ={styles.title}>Order Id</Text>
           <Text style ={styles.subtitle}>{orderdata.ORDERID}</Text> 
           </View>

           <View style ={styles.alltxthold}>
           <Text style ={styles.title}>Payment</Text>
           <Text style ={styles.subtitle}>{orderdata.paytype}</Text> 
           </View>

      
           <View style ={styles.totalhold}>
           
           <View style ={styles.totalline}>
           <Text style ={styles.righttxt}>SubTotal:</Text>
           <Text style={styles.lefttxt}>${orderdata.totaltopay}</Text>            
           </View>

           <View style ={styles.totalline}>
           <Text style ={styles.righttxt}>Tax:</Text>
           <Text style={styles.lefttxt}>$0</Text>            
           </View>

           <View style ={styles.totalline}>
           <Text style ={styles.righttxt}>Total</Text>
           <Text style={styles.righttxt}>${orderdata.totaltopay}</Text>            
           </View>

     


           </View>


    
          </ScrollView>

     


<TouchableOpacity style = {styles.bottombarcontainer} onPress= {()=>  setorderdata(prev => ({...prev,showmodel:false}))}>

<Text style = {styles.txt}>Close</Text>

</TouchableOpacity>





 </SafeAreaView>

</Modal>

 </SafeAreaView>



 

      );
    }
    
    const styles = StyleSheet.create({
      titletxt:{
        fontFamily:"Inter-Bold",
        fontSize:20,
        textAlign:"center",
        marginVertical:14
      },

      alltxthold:{
        marginHorizontal:10,
        paddingVertical:14,
        borderColor:"#7F7F7F",
        borderWidth:0.5,
        //borderBottomWidth:0.5,
        borderRadius:6,
        paddingHorizontal:10,
    
        marginBottom:14,
        //marginVertical:10,
       },

       title:{
        color:"black",
          fontSize:14,
          fontFamily:"Inter-Bold",
      },
       
      subtitlehold:{
        flexDirection:"row",
        justifyContent:"space-between"
    
       },
   

      subtitle:{
        fontSize:12,
        fontFamily:"Inter-Regular",
        color:"#7F7F7F",
      //  backgroundColor:"red",
        flex:1,
    },
 
    subtitle2:{
     fontSize:12,
     fontFamily:"Inter-Regular",
     color:"#7F7F7F",
    // backgroundColor:"green",
 
 },
 
 totalhold:{
  //  backgroundColor:"#C6C6C6",
    marginHorizontal:10,
    paddingVertical:14,
   
    borderColor:"#7F7F7F",
    borderWidth:0.5,

    //borderBottomWidth:0.5,

  
    borderRadius:6,
    paddingHorizontal:10,
    marginBottom:14,
   },

   totalline:{
   flexDirection:"row",
   justifyContent:"space-between",
   alignItems:"center",
   marginVertical:4,
   },

   righttxt:{
    fontFamily:"Inter-Bold",
    fontSize:12,
    color:"black",
   },

   lefttxt:{
    fontFamily:"Inter-Bold",
    fontSize:12,
    color:"#7F7F7F",
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
      //=======================================
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


                ordercounttxt:{
                  fontFamily:"Inter-Bold",
                  fontSize:16,
                 marginHorizontal:10,
                  marginBottom:14,
                  color:"#F47A00"

                },

                options:{
                  // backgroundColor:"red",
                   marginHorizontal:10,
                   flexDirection:"row",
                   justifyContent:"space-between",
                   alignItems:"center",
                  // marginVertical:4,
               
                  },
               
               
                  pickup:{
                   backgroundColor:"#F47A00",
                //   height:48,
                   flex:1,
                   borderRadius:6,
               marginRight:5,
                   justifyContent:"center",
                   alignItems:"center",
               
                  },
               
                  delivery:{
                   backgroundColor:"white",
                //   height:48,
               
                borderColor:"#7F7F7F",
                //borderWidth:0.5,
               
                borderWidth:0.5,
               
                   flex:1,
                   borderRadius:6,
               marginLeft:5,
                   justifyContent:"center",
                   alignItems:"center",
               },
               
               
               deliverytxt:{
                   fontFamily:"Inter-Bold",
                   fontSize:14,
                   color:"black",
                   paddingVertical:6,
                  },
               
                  pickuptxt:{
                   fontFamily:"Inter-Bold",
                   fontSize:14,
                   color:"white",
                   paddingVertical:6,
                  },

   
    });
  
  
    export default  Orderscreen
    