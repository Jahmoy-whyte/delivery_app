import {ActivityIndicator, StyleSheet, BackHandler, Text, Pressable ,FlatList,StatusBar, View ,TouchableOpacity,Platform,SafeAreaView} from 'react-native';

import {  Ionicons} from '@expo/vector-icons';
import { StatusBar as Expostatusbar } from 'expo-status-bar';

import React ,{ useContext, useEffect, useRef } from 'react';
import Loadingscreen from '../components/Loadingscreen';
import BottomSheet from '@gorhom/bottom-sheet';

import { GestureHandlerRootView  } from 'react-native-gesture-handler';
import Dishinfoscreen from './Dishinfoscreen';
import MenuCarditems from '../components/MenuCarditems';
import MenuHeader from '../components/MenuHeader';
import { Cartinfo_Context } from '../GlobalContext/Context';
import { useGetdishinfo } from '../services/Getdishinfo';
import  useBottomsheet_helper  from '../helpers/Bottomsheet_helper';
import useCalulatecarttotal_helper from '../helpers/Calulatecarttotal_helper';

//let thisnum = 0

const Menuscreen = ({route,navigation}) => {

let { querytxt,headimage} = route.params;


const [cartinfo , setcartinfo] = useContext(Cartinfo_Context)
const [dishdata,FUNC_Incart,FUNC_getmoredata] =  useGetdishinfo(querytxt,8)
const [carttotal] = useCalulatecarttotal_helper()

const scrolling = useRef()

const [openbottomsheet,
  closebottomsheet,
  isopen,passarr,
  bottomSheetRef,
  snapPoints,
  setisopen] = useBottomsheet_helper()


//<MaterialIcons style = {styles.barimagetxt} name="add-shopping-cart" size={18} color="white" />

//============
//Loading indicator
//============


useEffect(()=>{
  if(dishdata.loading === true) return
    FUNC_Incart(cartinfo)
    
},[dishdata.loading,cartinfo ])


  useEffect(() => {
    const backAction = () => {
      const isFocused = navigation.isFocused();
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





console.log("menu render =====================")



if (dishdata.loading == true ) {
  return <Loadingscreen />
}



   
    return(

<GestureHandlerRootView style={{ flex: 1 , backgroundColor: 'white'}}>

   <View style={styles.container}>

    
    <FlatList  style = {styles.forlist}
    onEndReachedThreshold ={0.05}
    onEndReached={() => FUNC_getmoredata(querytxt)}
         data={dishdata.data}
         ListHeaderComponent = {<MenuHeader headimage={headimage} querytxt ={querytxt} />}
         ListFooterComponent = {
          
           dishdata.getmore_loading == true
          ?<ActivityIndicator size="small" color="black"/>
          :null
          }
         renderItem ={({item,index}) =>{
        return(
        <MenuCarditems 
        dname = {item.Dish} 
        dprice = {item.Price} 
        ds = {item.Description} 
        dimg = {item.DishImage} 
        dtime = {item.PreparationTime} 
        dstatus = {item.DishStatus}
        dincart = {item.Incart}
        dishinfofn ={openbottomsheet}
        num = {index}
        dish_navigation ={navigation}
        dish_id = {item.Dishid}
 //       dindex
        />

        )
         }}/>




<Expostatusbar style='dark'  />
    
    <SafeAreaView style ={styles.backnav}>


     <TouchableOpacity style ={styles.backbutton} onPress ={() =>navigation.goBack()} >
           <Ionicons name="chevron-back" size={20} color="black" />
          
           </TouchableOpacity>


    </SafeAreaView>


  {cartinfo.length > 0 ? (
<SafeAreaView style = {{ backgroundColor: 'white'}}>
<TouchableOpacity  style ={styles.bottombarcontainer}  onPress ={() =>  navigation.navigate("Cart")}>
    <View style ={styles.leftinfo}>
    
    <Text style ={styles.txt}>SubTotal: ${carttotal} </Text>
    <Text style ={styles.txt1}>Items: {cartinfo.length}</Text>
    </View>
    <Text style ={styles.txt} >View Cart</Text>
</TouchableOpacity>
</SafeAreaView>
): null}



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
  nav_dishid  = {passarr[8]}
  />
    ) : <Loadingscreen />}
   
    
    


      </BottomSheet>





   </View>


 
   </GestureHandlerRootView>

   
    )

}










const styles = StyleSheet.create({

  backbutton:{
    //  flexDirection:"row",
    backgroundColor:"white",
      marginVertical:5,
      marginLeft:10,
     alignItems:"center",
     borderRadius:6,
     borderColor:"black",
     borderWidth:0.5,
     justifyContent:"center",
     width:30,
    height:30,
      },

  backinfo:{
  position:"absolute",
  backgroundColor:"black",
  opacity:0.2,
  width:"100%",
  height:"100%",
  },



  BottomSheetstyle:{
   // backgroundColor:"red",
    },

    
  backnav:{
  ...Platform.select ({
  ios: {

  },
  android:{
    marginTop: StatusBar.currentHeight
  }

  
  }),
  position:"absolute",
  //backgroundColor:"red",
 // zIndex:10,


  },

  backnavicon:{
    backgroundColor:"white",
    marginLeft:10,
    padding:4,
    borderRadius:15
  },


     // menuitemcontainer ===================================
     container: {
        flex: 1,
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
      txt1:{
        color:"white",
        fontFamily:"Inter-Regular",
        fontSize:12,

      },
  

    
  });


  export default Menuscreen;