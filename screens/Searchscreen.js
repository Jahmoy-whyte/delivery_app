import React,{useContext,useState,useEffect ,useCallback,useRef,useMemo} from "react";
import { Text, View, FlatList, StyleSheet, TextInput, StatusBar,SafeAreaView,TouchableOpacity, Pressable, BackHandler} from "react-native";
import { Ionicons , Feather, FontAwesome} from '@expo/vector-icons';
import { StatusBar as Expostatusbar } from 'expo-status-bar';
import Loadingscreen from "../components/Loadingscreen";
import { Cartinfo_Context, Userinfo_Context } from "../GlobalContext/Context";
import { GestureHandlerRootView  } from 'react-native-gesture-handler';
import {db} from "../Firebaseconfig";
import { 
collection, 
query, 
where,
getDocs,
getDoc,
doc,
limit,
} from "firebase/firestore"; 
import { useFonts } from 'expo-font';
import Searchcards from "../components/Searchcards";
import BottomSheet,{BottomSheetView , BottomSheetScrollView,BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import Dishinfoscreen from "./Dishinfoscreen";
import Toast from 'react-native-toast-message';
import useBottomsheet_helper from "../helpers/Bottomsheet_helper";
import Alertmessage from "../helpers/Alertmessage";
const Searchscreen = ({navigation}) => {

    console.log("search data ==============")
    const [loading, setLoading] = useState(true);
    const [userinfo , setuserinfo] = useContext(Userinfo_Context)
    const [cartinfo , setcartinfo] = useContext(Cartinfo_Context)

    const [searchdata, setsearchdata] = useState(true);
    const [searchdataCOPY, setsearchdataCOPY] = useState("");
    const [searching, setsearching] = useState(false);

    let [fontsLoaded] =   useFonts ({
        'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
        'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
      });
    
      const [openbottomsheet,
        closebottomsheet,
        isopen,passarr,
        bottomSheetRef,
        snapPoints,
        setisopen] = useBottomsheet_helper()
      
      
      


    useEffect(() => {
        getsearchdata()
       },[])
     

       useEffect(() => {
        const backAction = () => {
           
          if (isopen > -1) {
            bottomSheetRef.current.close()
            return true;
            }
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, [isopen]);

       


    
  const getsearchdata = async() => {
    setLoading(true)
    try{
   const docRef = doc(db, "Searchbar", "Searchdata");
   const docSnap = await getDoc(docRef);
   let arr = []
   if (docSnap.exists()) {
   arr =[...docSnap.data().Data]
   } else {
   Alertmessage("no dishies","custom_error")
   }

  setsearchdata(arr)
  setsearchdataCOPY(arr.slice(0,5))
  setLoading(false)

}catch(error){
  Alertmessage(error.code, "custom_error")
} 
}



const getsearchdish =  useCallback(async(searchname) => {

 
  // if (searching === true){return alert("wdwd")}


let newitemname = []
cartinfo.forEach((itemname) =>{
newitemname = itemname.split("@");
if (newitemname[0] == searchname){
   searchname = "incart"
}
})


if ( searchname == "incart"){
  Alertmessage("incart","custom_notify")
  return
}


setsearching(true)
try{
 const qr = query(collection(db, "Dishies"), where("Dish", "==", searchname));
 const querySnapshot =  await getDocs(qr);
 let arr = {}
 querySnapshot.forEach((doc) => {
 arr= {...doc.data(), "Dishid":doc.id}
 });

 







 if(Object.keys(arr).length ===0  ){return  Alertmessage("not found","custom_error")}
 setsearching(false)
 openbottomsheet(2, arr.Dish, arr.Price, arr.DishImage ,arr.Description,arr.PreparationTime,'1',false,arr.DishStatus ,"", "add","nonav",arr.Dishid)
}catch(error){
  Alertmessage(error.code,"custom_error")
}

},[cartinfo])



 const fillterdata =(txt) =>{
  txt = txt.trim()
    if(txt.length > 0){
    const result = searchdata.filter(word => word.toLowerCase().includes(txt.toLowerCase()))
    
    if(result.length > 8){
      setsearchdataCOPY(result.slice(0,5))
    }else{
      setsearchdataCOPY(result)
    }

    }
 }





 
  return (
     
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style = {{flex:1}}>

  <Expostatusbar style='auto'  />
    
    <View  style={styles.header}> 
    <View style = {styles.headerleft}>
      <Text style={styles.headertxt} adjustsFontSizeToFit={true}>Hi {userinfo.fname}!</Text>
      <Text style={styles.greetings}>Wellcome Back</Text>
    </View>
    




   

      <TouchableOpacity style = {styles.headerright}  onPress ={() =>navigation.navigate("Cart")}>
     
     {cartinfo.length> 0 ?(
      
       <View style = {styles.cartcountstyle}>
        <Text allowFontScaling ={false} style = {styles.cartcountstyletxt} >{cartinfo.length}</Text>
      </View>

        ):null}
   
<Feather style={[styles.carticon , 
          cartinfo.length > 0?
             {right:20} :  {right:0}  ]} name="shopping-cart" size={19} color="black" />
      
      </TouchableOpacity>
  </View> 


  <View style={styles.searhcontainer}>
    <Pressable onPress={() => navigation.goBack()}>
    <Ionicons style={styles.searchicon}  name="close-outline" size={18} color="black" />
    </Pressable>
    <TextInput
    editable = {loading ==false? true : false}
    onChangeText={(value) => fillterdata(value)}
     style={styles.searchtxtinput}
     autoFocus={true}
     
     />
</View>


{loading == true ||  (!fontsLoaded)  
 ?(<Loadingscreen />



 ): 

        <FlatList  style = {{flex:1, backgroundColor:"white"}}
        // horizontal = {false}
        // showsHorizontalScrollIndicator ={false}
         data={searchdataCOPY}
         renderItem ={({item}) =>{
   
         return (
      <Searchcards dishname={item} searchFN={getsearchdish} />
        
        )}
      }/>


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


{ isopen > -1 ? (
   
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
  nav_updatelist= {"hi"}
  nav_dishid = {passarr[8]}
  />
    ) : <Loadingscreen />}
 




</BottomSheet>






    </GestureHandlerRootView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    cartcountstyle:{
        width:20,
        height:20,
        backgroundColor:"red",
        borderRadius:10,
        position:"absolute",
        right:0,
        top:0,
        justifyContent:"center",
        alignItems:"center"
    
      },
    
      cartcountstyletxt:{
        color:"white",
        textAlign:"center",
       // textAlignVertical:"center",
       // fontFamily:"Inter-Regular",
        fontSize:10
      },
    
      carticon:{
        position:"absolute",
        right:20,
       },
    
      headerright: {
      
      //backgroundColor:"yellow",
        width:50,
        height:50,
        marginRight:10,
          justifyContent:"center",
          alignItems:"center"
    
          },
      container: {
        ...Platform.select ({
          ios: {},
          android:{marginTop: StatusBar.currentHeight}
        }),
        flex: 1,
        backgroundColor: 'white',
      },
    
      backinfo:{
        position:"absolute",
        backgroundColor:"black",
        opacity:0.2,
        width:"100%",
        height:"100%",
        },
      
      //header bar ===================================
      header: {
        paddingVertical:14,
        backgroundColor: 'white',
        justifyContent:"space-between",
        flexDirection:"row",
        alignItems:"center"
      },
    
      headertxt: {
      color:"black",
      fontSize:20,
      fontFamily:"Inter-Bold"
      },
    
      greetings: {
      color:"#7F7F7F",
      fontSize:12,
      fontFamily:"Inter-Regular"
      },
    
    
        headerleft: {
        marginLeft:10  
      },


       //searh bar ===================================
  searhcontainer:{
    backgroundColor:"white",
     borderColor:"#B3B3B3",
     borderWidth:0.5,
     marginHorizontal:10,
     alignItems:"center",
     flexDirection:"row",
     height:45,
     borderRadius:6,
  //  marginBottom:14
 /*
     shadowColor: "#000",
     shadowOffset: {
     width: 0,
     height: 3,
     },
     shadowOpacity: 0.27,
     shadowRadius: 4.65,
     elevation: 2,
     */
   },
   searchicon:{
     marginLeft:10
   },
 
   searchtxtinput:{
   // backgroundColor:"yellow",
     marginHorizontal:10,
     flex:1,
   },


   backinfo:{
    position:"absolute",
    backgroundColor:"black",
    opacity:0.2,
    width:"100%",
    height:"100%",
    },
    
});

export default Searchscreen;