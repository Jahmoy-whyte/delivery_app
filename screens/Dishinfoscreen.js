import { StatusBar as Expostatusbar } from 'expo-status-bar';
import React ,{useContext } from 'react';
import {
StyleSheet, 
Text,
View,
TextInput,
ScrollView,
SafeAreaView,
Image, 
ActivityIndicator,
TouchableOpacity} from 'react-native';

import { Entypo ,Ionicons, FontAwesome, Feather  } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import Loadingscreen from '../components/Loadingscreen';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import { Userinfo_Context,Cartinfo_Context } from '../GlobalContext/Context';


import { useQuantitychange } from '../helpers/Quantitychange';
import { useAddtocart } from '../services/Addcartitem';
import { useaddfavorite } from '../services/Addfavorite';


const Dishinfoscreen = ({nav_dname,
   nav_dprice, 
   nav_dimg ,
   nav_ds,
   nav_dtime,
   nav_quantity,
   nav_closebottomsheet,
   nav_comment,
   nav_action,
   nav_dishid
   } ) => {
   // dname, dprice, dimg ,ds,dtime,quantitynum ,dcomment, action


const [cartinfo , setcartinfo] = useContext(Cartinfo_Context)
const [userinfo , setuserinfo] = useContext(Userinfo_Context)

const [txtval, settxtval,buttonenable,addtocart,updatecart] = useAddtocart(nav_comment)
const  [quantityandprice,FUNC_Quantitychange] = useQuantitychange(nav_quantity,nav_dprice)
const  [loadstatus,FUNC_addtofavorite,FUNC_isadded] = useaddfavorite()




console.log("dish info render =======")


let [fontsLoaded] =   useFonts ({
'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
});

if (!fontsLoaded)  {
    return <Loadingscreen />
}




   






return(

  
<SafeAreaView  style ={styles.menuitemcontainer} >
<BottomSheetScrollView>

<Expostatusbar style='dark'  />
    
<SafeAreaView style ={styles.backnav}  >
    <TouchableOpacity> 
    <Feather name="chevron-down" size={24} color="black" />
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>FUNC_addtofavorite(nav_dishid)}> 
   
    {loadstatus === true?(
      null
    ):

    FUNC_isadded(nav_dishid) === true?(

      <FontAwesome name="bookmark" size={24} color="#F47A00" />
    ):

    <FontAwesome name="bookmark-o" size={24} color="#F47A00" />

    }

    </TouchableOpacity>
</SafeAreaView>


<ScrollView  >
<View style ={styles.bgimg}>
  <Image 
      style ={styles.topimg}
      source={{uri: nav_dimg }}
  
      />
</View>



<View>
  

    <Text style ={styles.headtxt}>{nav_dname}</Text>
    <Text style ={styles.pricetxt}>${nav_dprice}</Text>

    <View style ={styles.quantitycontainer}>
    <TouchableOpacity onPress={() => FUNC_Quantitychange("minus",nav_dprice,nav_quantity)}>
    <Entypo name="minus" size={24} color="white" />
    </TouchableOpacity>
    <Text style ={styles.quantitytxt}  allowFontScaling = {false}  >{quantityandprice.quantity}</Text>
    <TouchableOpacity onPress={() => FUNC_Quantitychange("plus",nav_dprice,nav_quantity)}>
    <Entypo name="plus" size={24} color="white" />
    </TouchableOpacity>
    </View>


    <Text style ={styles.commenttxt}>Comment:</Text>

 
    <TextInput 
    style ={styles.commentinput} 
    multiline= {true} 
    numberOfLines={6} 
    textAlignVertical ={"top"}
    onChangeText ={settxtval}
    value = {txtval}
    />

    
    <View style ={styles.descriptioncontainer}>
        <Text style ={styles.descriptionheader}>Description:</Text>

        <View style = {styles.bartimecontainer}>
            <Ionicons  style = {styles.bartimeicon} name="md-time-outline" size={18} color="#F47A00" />
            <Text style = {styles.bartimetxt} >{nav_dtime}</Text>
        </View>

    </View>


    <Text style ={styles.descriptiontxt}>{nav_ds}</Text>
</View>
</ScrollView>




</BottomSheetScrollView>







<TouchableOpacity disabled = {buttonenable}  style ={styles.bottombarcontainer} 
onPress ={() =>{
  
  if(nav_action === "add"){
  addtocart(
  nav_dname, 
  quantityandprice.quantity,
  quantityandprice.price,
  txtval,
   nav_dprice, 
   nav_ds, 
   nav_dtime ,
   nav_dimg,
   nav_closebottomsheet,
   nav_dishid
  )
  }else{
    updatecart(
      nav_dname, 
      quantityandprice.quantity,
      quantityandprice.price,
      txtval,
       nav_dprice, 
       nav_ds, 
       nav_dtime ,
       nav_dimg,
       nav_closebottomsheet,
       nav_action,
       nav_dishid
      )
    
  }
}}>

    <View style ={styles.leftinfo}>
    <Text style ={styles.txt}>SubTotal:</Text>
    <Text style ={styles.txt}>$
    
    {quantityandprice.quantity > 1 &&  quantityandprice.price == nav_dprice ?(
      FUNC_Quantitychange("calu",nav_dprice)
      ):quantityandprice.price
     }

    </Text>
    </View>


    {buttonenable == false?(
    <Text style ={styles.txt} >
      {nav_action =="add" 
      ?"Add"
      :"Update"
      
      }
    </Text>
    ):<ActivityIndicator size="large" color="white" />}
</TouchableOpacity>


</SafeAreaView>


)

}



const styles = StyleSheet.create({
    backnav:{
        zIndex:10,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width:"100%",
        paddingHorizontal:10
         
        },
        bgimg:{
          
        //  backgroundColor:"#F7A24D",
         // height:160,
         // width:160,
         // borderRadius:100,
        //  alignSelf:"center"
        },
     // menuitemcontainer ===================================
     menuitemcontainer:{
     // backgroundColor:"red",
      flex:1,
 backgroundColor: 'white'
      },

      topimg:{
        marginTop:5,
      height:150,
      width:150,
      borderRadius:100,
      alignSelf:"center",
      
  
      
      },

      headtxt:{
        fontFamily:"Inter-Bold",
        fontSize:20,
        alignSelf:"center",
        marginTop:5,
        textAlign:"center"
      },

      pricetxt:{
        marginTop:5,
        fontFamily:"Inter-Bold",
        fontSize:16,
        alignSelf:"center",
    
        color:"#F47A00"
      },

      quantitycontainer:{
        marginTop:5,
        backgroundColor:"black",
        flexDirection:"row",
        alignSelf:"center",
        alignItems:"center",
        width:110,
        justifyContent:"space-evenly",
        borderRadius:20,
        height:34
      },

      quantitytxt:{
        color:"white",
        fontFamily:"Inter-Bold",
        fontSize:15,
      },

      commenttxt:{
        marginTop:5,
        color:"#7F7F7F",
        fontFamily:"Inter-Bold",
        marginLeft:10,
        fontSize:14,


      },

      commentinput:{
       fontSize:14,
        borderWidth:1,
        borderColor:"#7F7F7F",
        marginLeft:10,
        marginRight:10,
        marginTop:5,
        height:90,
        backgroundColor:"white",
        borderRadius:6
      },

      descriptioncontainer:{

        flexDirection:"row",
        justifyContent:"space-between",
        marginHorizontal:10,
        marginTop:10,
        alignItems:"center",
      //  backgroundColor:"red"
      },
      bartimecontainer:{
        alignItems:"center",
        flexDirection:"row",
      },
      descriptionheader:{

        fontSize:14,
        color:"#7F7F7F",
        fontFamily:"Inter-Bold",

      },
      bartimetxt:{
        fontSize:14,
        color:"black",
        fontFamily:"Inter-Regular",

      },

      descriptiontxt:{
        marginTop:5,
        fontSize:14,
        color:"#7F7F7F",
        fontFamily:"Inter-Regular",
        marginHorizontal:10,
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

      bartimeicon:{
     marginRight:1
       
      },
  
  
      txt:{
        color:"white",
        fontFamily:"Inter-Bold",
        fontSize:14,

      },

    
  });


  export default Dishinfoscreen