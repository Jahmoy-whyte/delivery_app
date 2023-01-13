import { StyleSheet,
      Platform, 
      StatusBar, 
      SafeAreaView ,
      View ,
      TouchableOpacity,
      Text,
      BackHandler,
    ScrollView,} from 'react-native';
import { StatusBar as Expostatusbar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import Loadingscreen from '../components/Loadingscreen';

import React, { useState , useContext , useEffect} from 'react';
import { Userinfo_Context,Cartinfo_Context } from "../GlobalContext/Context";
import { StackActions } from '@react-navigation/native';


const Ordersentscreen = ({route,navigation}) => {
 // LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
//  LogBox.ignoreAllLogs();//Ignore all log notifications

const {paymentmethod,copycartinfo,passedorderid} = route.params

const [processing, setprocessing] = useState(false);
const [userinfo , setuserinfo] = useContext(Userinfo_Context)
const [cartinfo , setcartinfo] = useContext(Cartinfo_Context)
const [totalcalculation , settotalcalculation] = useState()
const [checkoutoption , setcheckoutoption] = useState("pickup")





useEffect(()=>{
   
  const backAction =()=>{
    return true
  }


    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
},[])


useEffect(() =>{

  if (copycartinfo.length > 0 ){
   console.log("total ======")
    let items;
    let itemsprice = 0
    copycartinfo.forEach((iteminarr) =>{
      items=  iteminarr.split("@");
      itemsprice += parseInt(items[2])
    })
    settotalcalculation(itemsprice)
    }else{
      settotalcalculation(0) 
    }
},[])
       let [fontsLoaded] =   useFonts ({
           'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
           'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
         });

     
        
         if  (!fontsLoaded)  {
           return <Loadingscreen />
         }



      
         
       return(


           <SafeAreaView style ={styles.container} >
             <Expostatusbar style='dark'  />
             <Text style = {styles.titletxt}>Order Confirmation</Text>
           <ScrollView>
          
       

           <View style ={styles.Thankyoumsghold}>
           <Text style ={styles.Thankyoutitle}>Thank You</Text>
           <Text style={styles.Thankyousubtitle}>Your order was received</Text>
          
           </View>

           <Text style ={styles.detailtitle}>Order Details</Text>
          
          
          
           <View style ={styles.alltxthold}>
           <Text style ={styles.title}>Items</Text>
          
            {copycartinfo.map((x,index)=>{

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
           <Text style ={styles.title}>Payment</Text>
           <Text style ={styles.subtitle}>{paymentmethod}</Text> 
           </View>

           <View style ={styles.alltxthold}>
           <Text style ={styles.title}>OrderId:</Text>
           <Text style ={styles.subtitle}>{passedorderid}</Text> 
           </View>
         
      
           <View style ={styles.totalhold}>
           
           <View style ={styles.totalline}>
           <Text style ={styles.righttxt}>SubTotal:</Text>
           <Text style={styles.lefttxt}>${totalcalculation}</Text>            
           </View>

           <View style ={styles.totalline}>
           <Text style ={styles.righttxt}>Tax:</Text>
           <Text style={styles.lefttxt}>$0</Text>            
           </View>

           <View style ={styles.totalline}>
           <Text style ={styles.righttxt}>Total</Text>
           <Text style={styles.righttxt}>${totalcalculation}</Text>            
           </View>

     


           </View>


    
          </ScrollView>



          <TouchableOpacity   style ={styles.bottombarcontainer} onPress={()=> 
          {
           // alert("gyg")
   
            navigation.dispatch(StackActions.popToTop())
          }
      
            } >
            <Text style ={styles.txt} >Home</Text>
        </TouchableOpacity>

        
          
          </SafeAreaView>
       
         )
       }
       



const styles = StyleSheet.create({

  titletxt:{
    fontFamily:"Inter-Bold",
    fontSize:20,
    textAlign:"center",
marginTop:14
  

  },
    Thankyoumsghold:{
        backgroundColor:"#F47A00",
        padding:20,
        alignItems:"center",
        borderRadius:6,
        marginHorizontal:10,
        marginVertical:14
        },

    Thankyoutitle:{
        fontFamily:"Inter-Bold",
        fontSize:20,
        color:"white"
    },

    Thankyousubtitle:{
        fontFamily:"Inter-Bold",
        fontSize:16,
        color:"white"
    },

    Thankyouorderid:{
      fontFamily:"Inter-Regular",
      fontSize:14,
      color:"white",
      paddingTop:10
  },
    

  detailtitle:{
    fontFamily:"Inter-Bold",
    fontSize:14,
    color:"black",
  // marginVertical:10,
  marginBottom:14,
   marginHorizontal:10,
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


     temptext:{

      alignSelf:"center",
      flex:1,
      justifyContent:"center"

     },
     contactinfo:{


         

     alignItems:"flex-start",
     borderRadius:6,
     borderColor:"#7F7F7F",
     //borderWidth:0.5,

     borderBottomWidth:0.5,
     justifyContent:"center",
     paddingBottom:10,
     paddingTop:5,


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


   alltxthold1:{
    marginHorizontal:10,
    paddingVertical:14,
    borderColor:"#7F7F7F",
    borderWidth:0.5,
 //  borderBottomWidth:0.5,
    borderRadius:6,
    paddingHorizontal:10,
    marginBottom:14,
   // marginVertical:10,
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
     //  backgroundColor:"red",
       flex:1,
   },

   subtitle2:{
    fontSize:12,
    fontFamily:"Inter-Regular",
    color:"#7F7F7F",
   // backgroundColor:"green",

},

 
   subtitlehold:{
    flexDirection:"row",
    justifyContent:"space-between"

   },

   textboxtxt:{

     color:"black" ,
     fontSize:12,
       fontFamily:"Inter-Regular",

       

   },


   mainbtn:{
       backgroundColor:"#F47A00",
       height:48,
       borderRadius:6,
       marginHorizontal:10,
       justifyContent:"center",
       alignItems:"center",
       marginBottom:14
       
   },
   mainbtntxt:{
       fontFamily:"Inter-Bold",
       fontSize:14,
       color:"white",
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


 export default Ordersentscreen