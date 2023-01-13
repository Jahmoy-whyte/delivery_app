//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, FlatList, Platform, StatusBar, View ,TouchableOpacity,Image ,Pressable} from 'react-native';
import {  Ionicons} from '@expo/vector-icons';
import {useEffect , useState ,useContext  ,useCallback } from 'react';
import {db} from "../Firebaseconfig";
import { 

getDoc,
doc,
arrayRemove, 
updateDoc
} from "firebase/firestore"; 
import { useFonts  } from 'expo-font';
import Loadingscreen from '../components/Loadingscreen';
import { Cartinfo_Context  , Userinfo_Context} from '../GlobalContext/Context';
import Cartcards from '../components/Cartcards';
import BottomSheet,{BottomSheetView } from '@gorhom/bottom-sheet';
import Dishinfoscreen from './Dishinfoscreen';
import { GestureHandlerRootView  } from 'react-native-gesture-handler';
import useBottomsheet_helper from '../helpers/Bottomsheet_helper';
import useCalulatecarttotal_helper from '../helpers/Calulatecarttotal_helper';
import Alertmessage from "../helpers/Alertmessage";
import Imageandtext from '../components/Imageandtext';

const Cartscreen = ({navigation}) => {

console.log("cart screen===================")

     const [loading, setLoading] = useState(true);
     const [cartinfo , setcartinfo] = useContext(Cartinfo_Context)
     const [userinfo , setuserinfo] = useContext(Userinfo_Context)
  
     const [deleing, setdeleing] = useState(false);
     
     const [openbottomsheet,
      closebottomsheet,
      isopen,passarr,
      bottomSheetRef,
      snapPoints,
      setisopen] = useBottomsheet_helper()

      const [carttotal] = useCalulatecarttotal_helper()




    let [fontsLoaded] =   useFonts ({
        'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
        'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
        });
        

useEffect(() => {

  const unsubscribe = navigation.addListener('beforeRemove', (e) => {
    
    if (isopen > -1) {
      bottomSheetRef.current.close()
      e.preventDefault();
      }else{
        if(deleing === true){
          e.preventDefault();
        }
      }
  
  });
  return unsubscribe;
}, [navigation ,isopen,deleing]);




useEffect(() => {
  Fn_getcartinfo()
}, []);


const Fn_getcartinfo = async() => {

  try{
  const docRef = doc(db, "Users", userinfo.userid);
  const docSnap = await getDoc(docRef)
  
  if (docSnap.exists()) {
      setcartinfo(docSnap.data().Cartitems)
      setLoading(false)
      setdeleing(false)
  } else {
    Alertmessage("Cart Error");
  }
}catch(error){
  Alertmessage("Cart Error");
}
  
}





const FUNC_delete = useCallback( async(itemtodelete)=>{

  setdeleing(true)
       try{
       const deletefn = doc(db, "Users", userinfo.userid);
       await updateDoc(deletefn, {
           Cartitems: arrayRemove(itemtodelete)
       });
     
       Fn_getcartinfo()
     }catch(error){
        Alertmessage("Error trying to delete item","custom_error")
        setdeleing(false)
       }
     
     },[])


  
  
  return (
       
<SafeAreaView style={styles.container}>
<GestureHandlerRootView style = {{flex:1}}>


<View style = {styles.header}>


<TouchableOpacity style ={styles.backnavicon} onPress ={() =>navigation.goBack()} >
    <Ionicons name="chevron-back" size={20} color="black" />
</TouchableOpacity>
  
<Text style = {styles.headertxt}>Your Cart</Text>

</View>


<TouchableOpacity style ={styles.alltxthold} onPress ={() =>navigation.navigate("address")}>
      <View style={styles.arrowtxt}>
      <Text style ={styles.title}>Add Delivery Address</Text>
      <Text style={styles.subtitle}>Your Information Can Be Changed In The Accout Tab. </Text>
      </View>

      <View style={styles.arrow}>
      <View   style ={styles.itemcount} >
      <Text style ={styles.itemcounttxt} >Add</Text>
      </View>
     
      </View>
  </TouchableOpacity>
  <Text style ={styles.itemdisplay} >Items({cartinfo.length})</Text>









{ loading == true ||  (!fontsLoaded)
?(
     <Loadingscreen />
): cartinfo.length ==0 ?( 

  <Imageandtext title={"Empty"} image ={require('../assets/emptycartpic.png')} />

):


        
  
<FlatList  style = {styles.forlist}
         data={cartinfo}
         showsHorizontalScrollIndicator ={false}
            renderItem ={({item}) =>{
                return(
                  
                <Cartcards 
                infostring = {item} 
                dishinfofn = {openbottomsheet}
                deleteincart ={FUNC_delete}
                deletestatus = {deleing}
                />
           )}}
                />    
    
       }






  
{ loading == true ||  (!fontsLoaded) || cartinfo.length == 0
?(
     null
   ):
    


<TouchableOpacity   style ={styles.bottombarcontainer} onPress={()=> navigation.navigate("checkout")} >
    <View style ={styles.leftinfo}>
    <Text style ={styles.txt}>SubTotal:</Text>
    <Text style ={styles.txt}>${carttotal}</Text>
    </View>
    <Text style ={styles.txt} >Check Out</Text>
</TouchableOpacity>

}


{ isopen > -1 ? (
    <Pressable  style = {styles.backinfo} onPress={() => closebottomsheet(0)} >
    
    </Pressable>
    ) : null}

    <BottomSheet


      style = {styles.BottomSheetstyle}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose ={true}
      onChange = {(index)=> setisopen(index)}
      index={-1}
      
      >


{ isopen > -1 ?  (
   
   <Dishinfoscreen
   nav_dname ={passarr[0]}  
  nav_dprice ={passarr[1]}  
  nav_dimg ={passarr[2]}  
  nav_ds ={passarr[3]} 
  nav_dtime ={passarr[4]}  
  nav_quantity = {passarr[5]}
  nav_closebottomsheet = {closebottomsheet}
  nav_comment = {passarr[6]}
  nav_action = {passarr[7]}
  nav_dishid = {passarr[8]}
  />
    ) : <Loadingscreen />}
 




</BottomSheet>


</GestureHandlerRootView>
    
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


          imgstyle:{
           
            width:250,
            height:250,
  
           
            },

            imgstyletxt:{
           
              width:"100%",
              textAlign:"center",
              fontSize:14,
              fontFamily:"Inter-Bold"
             
              },

            imgstylehold:{
      
          //  backgroundColor:"green",
             justifyContent:"center",
             alignItems:"center",
           //  position:"absolute",
           //  width:"100%",
            // height:"100%",
            flex:1,
             zIndex:-1
              },
  

          backinfo:{
            position:"absolute",
            backgroundColor:"black",
            opacity:0.2,
            width:"100%",
            height:"100%",
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


   backbuttontxt:{
       fontFamily:"Inter-Bold",
       fontSize:14,
       
   },

          bottombarcontainer:{
            backgroundColor:"#F47A00",  
            marginHorizontal:10,
            marginVertical:10,
            padding:10,
            flexDirection:"row",
            borderRadius:6,
            alignItems:"center",
            justifyContent:"space-between",
            paddingHorizontal:10,
          //  position:"absolute",
          //  bottom:0,
          },
    
         
      
      
          txt:{
            color:"white",
            fontFamily:"Inter-Bold",
            fontSize:14,
    
          },

          itemcounttxt:{
            color:"white",
            fontFamily:"Inter-Bold",
            fontSize:12,
    
          },


            itemcount:{
                 
               backgroundColor:"#F47A00",
               borderRadius:15,
           
            marginTop:10,
            paddingHorizontal:14,
             paddingVertical:6,
                justifyContent:"center",
                 alignItems:"center",
           
                 
        
             },



             arrowtxt:{
             flex:1,
            //  backgroundColor:"green",
             },
             arrow:{
              
              paddingLeft:10,
             // backgroundColor:"red",
             },
             alltxthold:{
              borderColor:"#7F7F7F",
               borderWidth:0.5,
              marginHorizontal:10,
              paddingVertical:14,
             backgroundColor:"white",
             justifyContent:"space-between",
             flexDirection:"row",
              borderRadius:6,

              paddingHorizontal:10,
              marginTop:0,
              marginBottom:14,
              alignItems:"center",
             },
          
          
      
             title:{
               color:"black",
                 fontSize:14,
                 fontFamily:"Inter-Bold",
             },
             subtitle:{
                 fontSize:12,
                 fontFamily:"Inter-Regular",
                 color:"#7F7F7F",
             },
           
             itemdisplay:{
              marginHorizontal:10,
              color:"#F47A00",
                fontSize:14,
                fontFamily:"Inter-Bold",
               // backgroundColor:"red",
            },
      
    });
  
  
    export default  Cartscreen
    