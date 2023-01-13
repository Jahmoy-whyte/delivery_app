import { StyleSheet, View ,Text, Image} from 'react-native';

//import { MotiView , AnimatePresence,MotiScrollView} from 'moti'


const Imageandtext = ({title ,image}) => {


return(
<View style = {styles.body}>


<Image 
resizeMode='contain'
source={image} style = {styles.image} />
  
<Text style = {styles.txt}>{title}</Text>

</View>

)}

const styles = StyleSheet.create({
  


          body:{
             alignItems:"center",
        
             justifyContent:"center",
             //backgroundColor:"red",
             flex:1,
          },
          txt:{
            fontFamily:"Inter-Regular",
            fontSize:14,
            marginTop:10
          },

          image:{

            width:200,
            height:200
          // marginHorizontal:10
          }
    
  });


  export default Imageandtext






