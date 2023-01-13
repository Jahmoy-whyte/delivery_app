import { StyleSheet, View ,TouchableOpacity,Text} from 'react-native';
import {  Ionicons } from '@expo/vector-icons';
import {memo} from 'react';
//import { MotiView , AnimatePresence,MotiScrollView} from 'moti'


const Header = ({title ,nav,disable}) => {


return(
<View style = {styles.header}>


<TouchableOpacity style ={styles.backnavicon} 
disabled = {disable === undefined? false : disable} 
onPress ={() =>nav.goBack()} >
    <Ionicons name="chevron-back" size={20} color="black" />
</TouchableOpacity>
  
<Text style = {styles.headertxt}>{title}</Text>

</View>

)}

const styles = StyleSheet.create({
  
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
    
  });


  export default memo(Header)






