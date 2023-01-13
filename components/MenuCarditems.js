import { StyleSheet, View ,TouchableOpacity,Text,Image} from 'react-native';
import { Entypo, Feather, AntDesign} from '@expo/vector-icons';
import {memo} from 'react';
//import { MotiView , AnimatePresence,MotiScrollView} from 'moti'
const MenuCarditems = (
    {
        dname,
         dprice,
          dimg ,
          ds,
          dtime , 
          dishinfofn,
          dstatus,
          dincart,
          num,
          dish_navigation,
          dish_id
    }) => {


      /*
       <View style = {styles.bartimecontainer}>
                  <Ionicons  style = {styles.bartimeicon} name="md-time-outline" size={18} color="#F47A00" />
                  <Text style = {styles.bartimetxt} >{dtime} </Text>
              
              </View>
      */

         //   dname, dprice, dimg ,ds,dtime,quantitynum,dcomment, action
        console.log("card items render " +num )
          return(
    
              <TouchableOpacity  style = {styles.barcontainer}
              onPress ={() => 
                dishinfofn(2, dname, dprice, dimg ,ds,dtime,'1',dincart,dstatus ,"", "add", dish_navigation,dish_id)
                } >
    
              <View style = {styles. alltxtcontain} >
              <Text   ellipsizeMode ="tail" numberOfLines={2}  style = {styles.bartitle}>{dname}</Text>
              
              <View style = {styles.barpricecontainer}>
                  <Text style = {styles.barpricetxt}>Price: </Text>
                  <Text style = {styles.barsmalltxt}>${dprice}</Text>
              </View>
        
              <Text ellipsizeMode ="tail" numberOfLines={1}  style = {styles.bardiscription}>Tap For Description</Text>
              
             
        
              </View>
        
        
              <View style = {styles. barimgcontainer} >
                  <Image  style = {styles.barimage} 
                  source={{uri: dimg }} />
        

                {dincart == true || dstatus == "False" ?(
                <View style = {[styles.barimagetxt , {

                    backgroundColor: dstatus == "False" ? "red" : "green"
                }]}>{dincart == true? 
                  <Feather name="shopping-cart" size={16} color="white" />
                  : dstatus == "False" 
                  ? <AntDesign name="closecircle" size={16} color="white" />: null}
                  </View>
                ):null}

              </View>

      
        
              </TouchableOpacity>
    
        
          )
        }
        



const styles = StyleSheet.create({

    
  //items list ============

alltxtcontain:{
    //backgroundColor:"red",
    flex:1
    
    },
    
    bartitle:{
    fontFamily:"Inter-Bold",
    fontSize:14,
    marginLeft:10,
    },
    
    barpricecontainer:{
        flexDirection:"row",
        marginLeft:10,
        
    },
    barpricetxt:{
        fontFamily:"Inter-Regular",
        fontSize:12,
        marginTop:1
    },
    barsmalltxt:{
        fontFamily:"Inter-Regular",
        fontSize:12,
        marginTop:1,
      //  color:"green"
        
    },
    bardiscription:{
        marginTop:1,
        fontFamily:"Inter-Regular",
        fontSize:12,
        color:"#7F7F7F",
        marginLeft:10,
       // backgroundColor:"red",
       // width:"50%"
    },
    
    bartimecontainer:{
        marginTop:1,
        flexDirection:"row",
        marginLeft:10,
        alignItems:"center"
    },
    bartimetxt:{
    
        fontFamily:"Inter-Regular",
        fontSize:12,
        marginLeft:5,
    },
    
    //bar image ============== 
        barcontainer:{
          paddingVertical:15,
      //  height:120,
       // backgroundColor:"red",
       backgroundColor: 'white',
       flexDirection:"row",
        justifyContent:"space-between",
        borderBottomColor:"#7F7F7F",
       // borderWidth:0.2,
        width:"100%",
        alignItems:"center"
        
        },
        
        barimgcontainer:{
        height:86,
        width:94,
        marginRight:10,
      //  marginLeft:10
      justifyContent:'center',
      alignItems:"center"
        },
        barimage:{
        height:86,
        width:94,
        borderRadius:6,
        },
        barimagetxt:{
       justifyContent:"center",
       alignItems:"center",
        color:"white",
       position:'absolute',
       bottom:0,

       width:40,
       height:40,
       borderRadius:20,
        },
      

    
  });


  export default memo(MenuCarditems);