import { StyleSheet, View ,TouchableOpacity,Text} from 'react-native';
import { AntDesign,Ionicons} from '@expo/vector-icons';
import {memo , useMemo} from 'react';

const Orderscards = ({orderid,delivreytype,cartarr,oderstatus,paymenttype,fn_passdata}) => {

    console.log("===============rnder")
   // checkcircle

   const calusubtotal = useMemo(()=>{
    let items;
    let itemsprice = 0
    for(let i = 0; i<cartarr.length; i++){
    items= cartarr[i].split("@");
    itemsprice += parseInt(items[2])
    }
    return itemsprice
    },[cartarr])
    
   // alert(itemsprice)
 
  
  
  
   let statuscheck;
   let itemcount = cartarr.length

if (oderstatus === "Sent"){
    statuscheck = 1

}else if(oderstatus === "Seen"){
    statuscheck = 2
}else if(oderstatus === "Cooking"){
    statuscheck = 3
}else if(oderstatus === "Ready"){
    statuscheck = 4
}

  

return(
    <TouchableOpacity style = {styles.alltxtcontain} onPress={()=>fn_passdata(cartarr,paymenttype,calusubtotal,orderid)}>
       


     <View style = {styles.infobarwrap}>
       <Ionicons name="time-outline" size={24} color="black" />
       

     
       <View style = {styles.infobarhold}>

        <View style = {styles.infotop}>
        <Text style = {styles.infobarorderid}>{orderid}</Text>
        <Text style = {styles.infobarprice}>${calusubtotal}</Text>
        </View>


        <View style = {styles.infobarbottom}>

        <View style = {styles.infobardelivreytype_and_itemcounthold}>
        <Text style = {styles.infobardeliverytype}>{delivreytype}</Text>
        <Text style = {styles.infobaritemcount}>Items:{itemcount}</Text>
        </View>


        <View style = {[styles.infostatus_and_icon,
            {backgroundColor:oderstatus==="Ready"
            ?"green"
            :"#F47A00"
           }
            ]}>
        <AntDesign style = {styles.statusinfotxticon}
         name= {"checkcircle"} size={14} color={"white"} /> 
        <Text style = {styles.infostatus}> {oderstatus}</Text>
  
        </View>

        </View>

       </View>

       </View>

  

    
      
    </TouchableOpacity>
)
}




const styles = StyleSheet.create({

    alltxtcontain:{
        borderColor:"#7F7F7F",
        borderRadius:6,
        borderWidth:0.5,
        marginHorizontal:10,
        marginTop:14
    },

    infobarwrap:{
       
        flexDirection:"row",
        alignItems:"center",
        borderColor:"#7F7F7F",
       // borderRadius:6,
       // borderWidth:0.5,
      // borderBottomWidth:0.5,
     //   marginHorizontal:5,
        marginVertical:5,
        padding:10
    },

    infobarhold:{
        flex:1,
        marginLeft:10,
       // backgroundColor:"lightgreen"
    },

    infotop:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
    },
    
    infobarbottom:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",

    },

    infostatus_and_icon:{
        backgroundColor:"#F47A00",
        borderRadius:6,
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:10,
        paddingVertical:5
    },




    infobarorderid:{
        fontFamily:"Inter-Bold",
        fontSize:14,
    },
    
    infobaritemcount:{
        fontFamily:"Inter-Regular",
        fontSize:12,
        color:"#7F7F7F"
    },

    infobarprice:{
        fontFamily:"Inter-Bold",
        fontSize:14,
        color:"#F47A00"
    },
    infobardeliverytype:{
        fontFamily:"Inter-Regular",
        fontSize:12,
        color:"black"
    },

    infostatus:{
        fontFamily:"Inter-Regular",
        fontSize:12,
        color:"white"
    },

    moreinfo:{
        color:"#F47A00",
        fontFamily:"Inter-Regular",
        textAlign:"center",
        marginBottom:5,
        fontSize:12,
    },

    ww:{

    },

    ww:{

    },

    ww:{

    },



});


  export default memo(Orderscards);