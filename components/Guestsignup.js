import { StyleSheet, View ,Text, Image ,TouchableOpacity} from 'react-native';
import { Userinfo_Context,Cartinfo_Context ,Userstate_Context } from '../GlobalContext/Context';
import React, { useContext } from 'react';


const Guestsignup = ({backbtn,nav}) => {

    if(backbtn === undefined){
        backbtn = false
        nav =false
    }



  const [userscreenstate,setuserscreenstate] = useContext(Userstate_Context)
return(
<View style = {styles.body}>


<Image 
resizeMode='contain'
source={require("../assets/signup.png")} style = {styles.image} />
  
<Text style = {styles.title}>Sign Up</Text>

<Text style = {styles.subtxt}>Please Sign Up To Continue</Text>


<View style = {styles.btncontain}>
<TouchableOpacity style = {styles.btn} onPress = {()=>setuserscreenstate("loggedout")} >
<Text style = {styles.btntxt}>Sign Up</Text>
</TouchableOpacity>

{backbtn === true?(
<TouchableOpacity style = {styles.backbtn} onPress ={()=> nav.goBack()}>
<Text style = {styles.backbtntxt}>Back</Text>
</TouchableOpacity>
):null}

</View>
</View>

)}

const styles = StyleSheet.create({
  


          body:{
             alignItems:"center",
        
             justifyContent:"center",
             backgroundColor:"white",
             flex:1,
          },


          title:{
            fontFamily:"Inter-Bold",
            fontSize:16,
            marginTop:10
          },

          subtxt:{
            fontFamily:"Inter-Regular",
            fontSize:12,
            marginTop:10,
            color:"#B3B3B3"
          },

          image:{

            width:200,
            height:200
          // marginHorizontal:10
          },

          btn:{
            marginTop:10,
            backgroundColor:"#F47A00",
           paddingHorizontal:18,
           paddingVertical:10,
            marginHorizontal:20,
            borderRadius:6,
            alignItems:"center",
           // marginBottom:14,
    
            },

            backbtn:{
                marginTop:10,
             borderWidth:0.5,
               paddingHorizontal:18,
               paddingVertical:10,
                marginHorizontal:20,
                borderRadius:6,
                alignItems:"center",
                marginBottom:14,
            },

            backbtntxt:{
                fontFamily:"Inter-Bold",
                color:"black",
                fontSize:12,
            },
    
            btntxt:{
                fontFamily:"Inter-Bold",
                color:"white",
                fontSize:12,
            },
            btncontain:{
                width:"100%"
            }
    
  });


  export default Guestsignup






