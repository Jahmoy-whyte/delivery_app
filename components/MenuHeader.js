import { StyleSheet, View ,Text,Image} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import {memo} from 'react';

const MenuHeader = ({headimage , querytxt}) => {
    console.log("FlatListHeader")
    return(
  
        <View  style = {styles.listheader} >
     
        <Image  style = {styles.listimage} 
        source={headimage} 
        /> 
        
        <View style = {styles.listtint} >
        </View>
  
  
        <View style = {styles.listtxthold}>
        <Text style = {styles. listheadtxt}>{querytxt}</Text>
        
        <View style = {styles.listtxtcontain}>
        <FontAwesome5 name="store" size={15} color="#F47A00" />
            <Text style = {styles. listsmalltxt}>Open 8pm - 5pm | Dishies(29)</Text> 
            
        </View>
        </View>
        </View>
  
  
    )
  }



const styles = StyleSheet.create({

    listheader:{
        height:250,
        width:"100%",
     },
 
     listimage:{
       height:250,
       width:"100%",
    },

    listtint:{
       opacity:0.3,
       backgroundColor:"black",
       height:250,
       width:"100%",
       position:"absolute",

    },

    listtxtcontain:{
       flexDirection:"row",
        alignItems:"center",
        
    },

    listheadtxt:{
       fontFamily:"Inter-Bold",
       fontSize:20,
       color:"white",
   

    },

    listsmalltxt:{
       fontFamily:"Inter-Regular",
       fontSize:12,
       color:"white",
       marginLeft:5,
      // position:"absolute",

    },
    listtxthold:{
       position:"absolute",
       bottom:10,
       marginLeft:10,
   //    backgroundColor:"purple",
     //    padding:8,

        // borderRadius:6
    }


    
  });


  export default memo(MenuHeader);