import { StatusBar as Expostatusbar } from 'expo-status-bar';
import React ,{ useEffect,  useContext ,useRef} from 'react';
import {
StyleSheet, 
Text,
View,
Pressable,
StatusBar,
ScrollView,FlatList,
SafeAreaView,
Image, 
TouchableOpacity,
BackHandler ,
Platform} from 'react-native';

import Homedishcards from '../components/Homedushcards';
import { useFonts } from 'expo-font';
import Menucards from "../components/Menucards";
import Loadingscreen from '../components/Loadingscreen';
import { AntDesign , MaterialIcons,Feather  } from '@expo/vector-icons';
import { Userinfo_Context,Cartinfo_Context ,Userstate_Context } from '../GlobalContext/Context';
import BottomSheet from '@gorhom/bottom-sheet';
import Dishinfoscreen from './Dishinfoscreen';
import { GestureHandlerRootView  } from 'react-native-gesture-handler';


import { useGetuserinfo } from '../services/Getuserinfo';
import { useGetdishinfo } from '../services/Getdishinfo';
import  useBottomsheet_helper  from '../helpers/Bottomsheet_helper';

//============
  //temp data
  //============

let n = 0
const tempfunction = () =>{
/*
 const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

*/

  /*
  const q =  query(collection(db, "Dishies"), where("DishType", "==", "Jamaican Dishes"),limit(8));
  const Unsubscribe =  onSnapshot(q, (querySnapshot) => {
  const getdish = []
  querySnapshot.forEach((doc) => {
    getdish.push(doc.data());
  });
  setdishdata(getdish)
// alert("wdwdd")

})


*/

}

export default function Homescreen({navigation}) {

  //============
  // load fonts
  //============
  let [fontsLoaded] =   useFonts ({
    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
  });


  
  const [userscreenstate,setuserscreenstate] = useContext(Userstate_Context)
  const [userinfo , setuserinfo] = useContext(Userinfo_Context)
  const [cartinfo , setcartinfo] = useContext(Cartinfo_Context)

  const [dishdata1,FUNC_Incart1] =  useGetdishinfo("Jamaican Dishes",5)
  const [dishdata2,FUNC_Incart2] =  useGetdishinfo("Chinese Food",5)
 
  const [userdata_info, userdata_cart , userdata_loading,metadata] =  useGetuserinfo(true)

  const scrolling = useRef()


  
  const [openbottomsheet,
    closebottomsheet,
    isopen,passarr,
    bottomSheetRef,
    snapPoints,
    setisopen] = useBottomsheet_helper()


console.log("Home Rerender ================= " + n++ )


//"package": "com.johnwata.delivery_app"






  //============
  //on load call this function
  //============







    useEffect(()=>{
      if(userdata_loading === true) return
       setcartinfo(userdata_cart)
       setuserinfo(userdata_info)
    },[userdata_loading])

  useEffect(()=>{
    if(dishdata1.loading === true
      ||dishdata2.loading=== true
       || userdata_loading === true) return
      FUNC_Incart1(cartinfo)
      FUNC_Incart2(cartinfo)
  },[cartinfo])


  useEffect(()=>{
    if (metadata.loading === true) return
    if(metadata.data.Openstatus === true) return
    setuserscreenstate("closed")
  },[metadata])




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
  





  const Fn_navigate = (msg,dishimg)=>{
    navigation.navigate('Menu', {
 
        querytxt: msg,
        headimage:dishimg
})
}




const goto  = ()=> {

  scrolling.current.scrollTo({ x:  147, y: 0, animated: true })


}


/*  <View style={styles.advertcontainer}>
<View>
<Text style={styles.adverttxtheading}>60% 0ff</Text>
<Text style={styles.adverttxt} numberOfLines = {1} ellipsizeMode = 'tail'>food substance consisting ....</Text>
</View> 
<Image 
    style ={styles.adverimg}
    source={require('../assets/temppic.png')}
    />
</View>
*/

//============
//Loading indicator
//============




  return (


    
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style = {{flex:1}}>

  <Expostatusbar style='dark'  />
   
   
    {/* Header 
    pading vertical = 14

    headerleft
    pading horizontal = 10 
    */}


<View  style={styles.headerbackcolor}> 
      <View  style={styles.header}> 
        <View style = {styles.headerleft}>
          <Text onPress={()=>FN_resetdata1()} style={styles.headertxt} adjustsFontSizeToFit={true}>
            Hi 
          
           {userinfo === null
          ? ""
          : " "+userinfo.fname
        }!
          
          </Text>
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

      <TouchableOpacity onPress={()=> navigation.navigate("search") } style={styles.searhcontainer}>
     
          <AntDesign style={styles.searchicon} name="search1" size={18} color="black" />
 
          <Text style={styles.searchtxt}>Search Your favorite food</Text>
        </TouchableOpacity>

        </View>



        {userdata_loading === true   ||dishdata1.loading === true  
        ?(<Loadingscreen />
         ):

 


<ScrollView style ={styles.forscrollview} 
 showsVerticalScrollIndicator ={false}
 alwaysBounceVertical = {false}
 >





    {/* searhcontainer 
    no margin or padding

    



    */}

    


     
   {/* subheading 
    left - fontSize:18,
   right - fontSize:14,
   padding vertial : 14




<View style = {styles.subheading}>
          <Text style = {styles.subtitle}>Menus</Text>
          
        </View> 

        
        <View style={styles.advertcontainer}>
<View>
<Text style={styles.adverttxtheading}>60% 0ff</Text>
<Text style={styles.adverttxt} numberOfLines = {1} ellipsizeMode = 'tail'>food substance consisting ....</Text>
</View> 
<Image 
    style ={styles.adverimg}
    source={require('../assets/menuimg1.png')}
    />
</View>

   
    */}



{metadata.loading=== true?(
null
      
      
  ):


  <View style={styles.advertcontainer}>
  

  
      <View>
      <Text style={styles.adverttxtheading}>{metadata.data.Advert.Title}</Text>
      <Text style={styles.adverttxt} numberOfLines = {1} ellipsizeMode = 'tail'>
   
        {metadata.data.Advert.Subtitle}...
        </Text>
      </View> 
      <Image 
          style ={styles.adverimg}
          source={{uri: metadata.data.Advert.Image}}
          />
    

        
  </View>

}    

        <ScrollView ref={scrolling} alwaysBounceHorizontal = {false} horizontal = {true} style = {styles.menuscroll} showsHorizontalScrollIndicator ={false} >

        <TouchableOpacity style = {styles.menuhold} onPress ={() => goto()}> 
        <Text style = {styles.menutxt}>Menus</Text>
        <MaterialIcons
         name="arrow-forward-ios" 
         size={14} color="white"
         allowFontScaling = {true} />
        </TouchableOpacity>
                
          <Menucards  backcolor="#F47A00"  qtxt="Jamaican Dishes" title="Jamaican"  dishnumber="Dishies(20)" dishimg ={require('../assets/jadish.jpg')}  fn = {Fn_navigate}/>
          <Menucards backcolor="#F47A00"  qtxt="Chinese Food" title="Chinese" dishnumber="Dishies(30)" dishimg ={require('../assets/chdish.jpg')} fn = {Fn_navigate}/>
          <Menucards backcolor="#F47A00"  qtxt="Sea Food"  title="Sea" dishnumber="Dishies(10)" dishimg ={require('../assets/sdish.jpg')} fn = {Fn_navigate}/>

        </ScrollView>

        <View style = {styles.subheading}>
          <Text style = {styles.subtitle }  >Jamaican Dishes</Text>
          <Text style = {styles.subviewall}  onPress ={()=> Fn_navigate("Jamaican Dishes",require('../assets/jadish.jpg'))}>ShowAll</Text>
        </View> 

    
        <FlatList  style = {styles.forlist}
         horizontal = {true}
         showsHorizontalScrollIndicator ={false}
         
         data={dishdata1.data}
        keyExtractor = {item => item.Dishid}
         renderItem ={({item}) =>{
         return (
        <Homedishcards 
        dname = {item.Dish} 
        dprice = {item.Price} 
        dtype = {item.DishType} 
        dimg = {item.DishImage} 
        dtime = {item.PreparationTime} 

        ds = {item.Description} 
        dstatus = {item.DishStatus}
        dincart = {item.Incart}
        dishinfofn ={openbottomsheet}
        dish_navigation ={navigation}
        dish_dishid = {item.Dishid}
        />
        )}
      }/>
      

        <View style = {styles.subheading}>
          <Text style = {styles.subtitle}>Chinese Dishies</Text>
          <Text style = {styles.subviewall} onPress ={()=> Fn_navigate("Chinese Dishies",require('../assets/chdish.jpg'))}>ShowAll</Text>
        </View> 


   
        <FlatList  style = {styles.forlist}
         horizontal = {true}
         data={dishdata2.data}
         showsHorizontalScrollIndicator ={false}
         renderItem ={({item}) =>{
         return (
        <Homedishcards 
        dname = {item.Dish} 
        dprice = {item.Price} 
        dtype = {item.DishType} 
        dimg = {item.DishImage} 
        dtime = {item.PreparationTime} 

        ds = {item.Description} 
        dstatus = {item.DishStatus}
        dincart = {item.Incart}
        dishinfofn ={openbottomsheet}
        dish_navigation= {navigation}
        dish_dishid = {item.Dishid}
        />
        )}
      }/>
    
    </ScrollView>
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

  );

}




const styles = StyleSheet.create({


menuhold:{
backgroundColor:"#F47A00",
height:100,
      width: 133,
      marginLeft:14,
    borderRadius:6,
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row"
},

menutxt: {
  color:"white",
  fontSize:14,
  fontFamily:"Inter-Bold",
 // backgroundColor:"red"
  },



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
 


   // scrollview ===================================
   forscrollview:{
    backgroundColor:"white",
    flex:1,
  
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
    marginBottom:14,
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

  searchiconhold:{
  //  marginLeft:10,
 //   backgroundColor:"#F47A00",
    height:45,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:6,
    width:40
  },

  searchtxt:{
    fontSize:12,
    marginLeft:10,
    color:"#7F7F7F"
  },

 // advert bar ===================================


 advertcontainer:{
  backgroundColor:"#F47A00",
   marginHorizontal:10,
   alignItems:"center",
   flexDirection:"row",
marginBottom:14,
//marginTop:14,
  // height:80,
   paddingVertical:10,
   borderRadius:6,
   justifyContent:"space-between"
 },
 adverttxtheading:{
  fontSize:16,
   marginLeft:10,
   color:"white",
   fontFamily:"Inter-Bold"
 },

 adverttxt:{
   fontSize:12,
   marginLeft:10,
   color:"white",
   fontFamily:"Inter-Regular"
 },
    
 adverimg:{
  width:65,
  height:65,
  marginRight:10,
},
  // subheadings ===================================

  subheading:{
    flexDirection:"row",
    justifyContent:"space-between",
    paddingVertical:14,
    alignItems:"center",
  
  },

  subtitle:{
    fontSize:16,
    marginLeft:10 , 
  // fontWeight:"bold",
  fontFamily:"Inter-Bold"
  },

  subviewall:{
    fontSize:14,
    color:"#F47A00",
    marginRight:10,
    fontFamily:"Inter-Regular"
  },


  // menuscroll ===================================
  menuscroll:{
   // backgroundColor:"red",
   marginLeft:-4,

   

  },






    forlist:{
      marginLeft:-4,
    //height:254,
    //backgroundColor:"red"
        
      },



  
  
});

