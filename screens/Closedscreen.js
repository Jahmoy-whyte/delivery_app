import { StyleSheet, View ,Text, Image , ActivityIndicator, ScrollView, Modal,TouchableOpacity} from 'react-native';
import React,{ useState} from 'react';
import { StatusBar as Expostatusbar } from 'expo-status-bar';

import Alertmessage from '../helpers/Alertmessage';
import { doc, getDoc } from "firebase/firestore";
import { async } from '@firebase/util';
import { db } from '../Firebaseconfig';
const Closedscreen = () => {

   const [data, setdata]  = useState({
    loading:false,
    data:null,
    open:false,
    })


const fUNC  = async() =>{


    

    try{
    setdata(prev =>({...prev, loading:true}))
    const docRef = doc(db, "Metadata", "Metadata");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {


   //  console.log("Document data:", docSnap.data());
     setdata(prev =>({ loading:false , data: docSnap.data().Openingtimes ,open:true}))
   
   console.log(docSnap.data().Openingtimes)
    } else {
      Alertmessage("error while getting data")
    }
    }catch(e){

        Alertmessage("error while getting data")
    }

}

const Dateformat = ({day,time}) =>{


    return(

        <View style ={styles.alltxthold}>
        <Text style ={styles.title}>{day}</Text>
        <Text style ={styles.subtitle}>{time}</Text> 
        </View>
    )
}

return(
<View style = {styles.body}>
<Expostatusbar hidden = {true}/>

<Image 
resizeMode='contain'
source={require("../assets/closed.png")} style = {styles.image} />

<Text style = {styles.txt}>Closed</Text>
<Text style = {styles.subtxt}>We Are Closed</Text>


<View style = {styles.btncontain}>
<TouchableOpacity style = {styles.logoutbtn} onPress ={()=> fUNC()} >
    {data.loading === false?(
   <Text style = {styles.logouttxt} >See Opening Time</Text>
   ):
   <ActivityIndicator size={'small'}  color ={"white"} />
   }
</TouchableOpacity>
</View>


<Modal onRequestClose={() => setdata(prev =>({...prev , open:false}))} visible = {data.open} animationType ={'slide'}>

{data.data != null?(
<ScrollView style = {{marginTop:14 , flex:1, backgroundColor:"white"}}>
<Dateformat  day={"Monday"} time ={data.data.Monday} />
<Dateformat  day={"Tuesday"} time ={data.data.Tuesday} />
<Dateformat  day={"Wednesday"} time ={data.data.Wednesday} />
<Dateformat  day={"Thursday"} time ={data.data.Thursday} />
<Dateformat  day={"Friday"} time ={data.data.Friday} />

<TouchableOpacity style = {styles.logoutbtn} 
onPress ={() =>setdata(prev =>({...prev , open:false}))} >
   <Text style = {styles.logouttxt} >Back</Text>
</TouchableOpacity>
</ScrollView>
):null}





</Modal>



</View>



)}

const styles = StyleSheet.create({
  


          body:{
             alignItems:"center",
        
             justifyContent:"center",
             backgroundColor:"white",
             flex:1,
          },
          txt:{
            fontFamily:"Inter-Bold",
            fontSize:14,
            color:"black",
            marginTop:10
          },

          image:{

            width:200,
            height:200
          // marginHorizontal:10
          },
          btncontain:{
            width:"100%",
          //  backgroundColor:"red"
          },
          logoutbtn:{
            backgroundColor:"#F47A00",
           paddingHorizontal:14,
           paddingVertical:10,
           marginHorizontal:10,
           marginTop:10,
            borderRadius:6,
            alignItems:"center",
            marginBottom:14,
    
            },
    
            logouttxt:{
                fontFamily:"Inter-Bold",
                color:"white",
                fontSize:14,
            },



            subtxt:{
                fontFamily:"Inter-Regular",
                color:"black",
                fontSize:12,

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
            
      
            
            
               title:{
                 color:"black",
                   fontSize:14,
                   fontFamily:"Inter-Bold",
               },
               subtitle:{
                   fontSize:12,
                   fontFamily:"Inter-Regular",
                   color:"#7F7F7F",
                  //backgroundColor:"red",
                
               },
    
    
  });


  export default Closedscreen






