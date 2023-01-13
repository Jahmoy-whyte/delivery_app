import React,{memo } from "react";
import { Text, View, StyleSheet} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';



const Errormsg = ({msg,alerttype}) => {

  console.log("error msg ========")
  let [fontsLoaded] =   useFonts ({
    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
  });

  if  (!fontsLoaded)  {
  return null
  } 


  const cleanmsg = () =>{

    if (msg ===undefined) {return "error(und1)"}
    let  txt = msg
    txt = txt.replace("auth/","") 
    for (let char of txt) {
     char == "-" ? txt = txt.replace("-"," ") : ""
   }
   return txt
  }

 

  if (alerttype === "error") {
    return (
      <View style ={styles.errorhold}>
      <MaterialIcons name="error" size={24} color="white" />
      <Text style={styles.errorsubtitle}>{cleanmsg()}</Text>
      </View>
  )
}else if (alerttype === "success") {
  return (
    <View style ={[styles.errorhold,{backgroundColor:"green"}]}>
    <MaterialIcons name="error" size={24} color="white" />
    <Text style={styles.errorsubtitle}>{msg}</Text>
    </View>
)
}else if (alerttype === "notify") {
  return (
    <View style ={[styles.errorhold,{backgroundColor:"#F47A00"}]}>
    <MaterialIcons name="error" size={24} color="white" />
    <Text style={styles.errorsubtitle}>{msg}</Text>
    </View>
)
}


}
  

const styles = StyleSheet.create({
    errorhold:{
      flex:1,
        flexDirection:"row",
        alignItems:"center",
    
        backgroundColor:"#EA0000",
        paddingVertical:10,
        paddingHorizontal:10,
        marginHorizontal:10,
        borderRadius:6,
     //  position:"absolute",
     //   width:"100%"
 
     alignSelf:"center"
      },
      
      errortitle:{
        fontFamily:"Inter-Bold",
        fontSize:14,
        color:"white",
      },
      
      errorsubtitle:{
        marginLeft:5,
        fontFamily:"Inter-Regular",
        fontSize:12,
        color:"white",
      },
    
});

export default memo(Errormsg);