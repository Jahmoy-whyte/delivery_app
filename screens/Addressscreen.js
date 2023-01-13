import React, { useState, useEffect, useCallback,useContext } from 'react';
import { Platform, Text, View, StyleSheet ,Modal,
  TouchableOpacity ,StatusBar, Pressable, SafeAreaView, TurboModuleRegistry} from 'react-native';
import Buttons from '../components/Buttons';
import { StatusBar as Expostatusbar } from 'expo-status-bar';
import Header from '../components/Header';
import Checkbox from 'expo-checkbox';
import { FontAwesome ,Ionicons ,AntDesign} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Alertmessage from '../helpers/Alertmessage';
import { ScrollView } from 'react-native-gesture-handler';
import Loadingscreen from '../components/Loadingscreen';
import Guestsignup from '../components/Guestsignup';
import { Userinfo_Context,Cartinfo_Context ,Userstate_Context } from '../GlobalContext/Context';


export default function Addressscreen({navigation}) {
  
  const [Modelvisible, setModelvisible] = useState(false);
  const [addressdata, setaddressdata] = useState([]);
  const [loading, setloading] = useState(true);
  const [addressselect, setaddressselect] = useState(null);
  const [userinfo , setuserinfo] = useContext(Userinfo_Context)



  const fnshowmodel = () =>{
    setModelvisible(true);
  }
  const fnnavigategps = () =>{
    setModelvisible(false);
    navigation.navigate("addressinfo",{
      getlocationbool: true
    })
  }
  const fnnavigate = () =>{
    setModelvisible(false);
    navigation.navigate("addressinfo",{
      getlocationbool: false
    })
  }
  const Adddressui = useCallback(({tag,address ,id}) =>{
    console.log("===www=======")
    return(
      <TouchableOpacity style = {styles.paymentmethod} 
      onPress = {()=> FUNC_addressselect(id)}
      >
      <TouchableOpacity 
      onPress={()=> FUNC_removeaddress(id)}
      style = {{
        backgroundColor:"red",
        borderRadius:50,
        padding:5,
        justifyContent:"center",
        alignItems:"center",
        marginRight:10
      }}>
      <AntDesign name="delete" size={24} color="white" />
      </TouchableOpacity>

      <View style = {styles.paymentmethodiconcontainer}>
      <Ionicons name="location-outline" size={24} color="#7F7F7F"  style = {styles.paymentmethodicon}/>

      <View style = {styles.titleandsubtitlehold}>
      <Text style = {styles.paymentmethodtitle}>{tag}</Text>
      <Text style = {styles.paymentmethodsubtitle}>{address} </Text>
      </View>
      
      </View>
      
      <Checkbox 
      style = {styles.stylecheckbox}
      value={
        addressselect === id
        ? true
        : false
      } color={"black"} />
      
      </TouchableOpacity>

    )
  },[addressselect])



  
  const FUNC_addressselect = async (id) =>{
    try{
      await AsyncStorage.setItem('@current_address_Key', id)
      setaddressselect(id)
    }catch(e){
      Alertmessage("error","custom_error")
    }
  }

  const FUNC_currentaddress = async() =>{
   try{
    const currentaddress = await AsyncStorage.getItem('@current_address_Key')
    if (currentaddress !== null){
      setaddressselect(currentaddress)
    }
    getData()
  }catch(e){
    Alertmessage("error occurred","custom_error")
  }
  }

  const FUNC_removeaddress = async(id) =>{
    const words = addressdata.split('@');
    alert(id)

    
  }




useEffect(()=>{
  FUNC_currentaddress()
},[])

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem('@address_storage_Key')
      if(data === null){
        setloading(false)
        return}
      const words = data.split('@');
      setaddressdata(words)
      setloading(false)
    } catch(e) {
      Alertmessage("error","custom_error")
    }
  }




  // ================= Guest =====================
if(userinfo === null || userinfo.role === "Guest"){
  return <Guestsignup backbtn={true} nav ={navigation}/>
}
// ================= Guest =====================



  return (



    <View style = {styles.container}>
<SafeAreaView>

  

      <Header title={"Address"}  nav={navigation}/>

    <View style ={styles.alltxthold}>
      <Text style ={styles.title}>Important:</Text>
      <Text style ={styles.subtitle}>We Are Olny Delivering To ...</Text> 
    </View>


{loading === true ?(

<Loadingscreen />

):

<ScrollView>
   
    {addressdata.map((data , index)=>{
      const words = data.split('$');
      let parish = words[0]
      let address = words[1]
      let tag = words[2]
      let addrwess = words[1]
  
return(
<Adddressui address={address}key ={data}  tag ={tag} id ={data}/>
)

      
})}
    <Buttons loading={false} text={"Add"} fUNC={fnshowmodel} />
</ScrollView>
}




   
   
   
   
   
   
    <Modal 
    animationType='fade' 
    visible = {Modelvisible} 
    onRequestClose ={()=>  setModelvisible(prev => (false))} 
   transparent ={true}

    >

      <Pressable style = {styles.backofmodel} onPress={()=>setModelvisible(prev => (false))}>



      <View style = {styles.Buttonshold}>
      <Buttons loading={false} text={"Enter Address"} fUNC={fnnavigate} />
      <Text style = {styles.ortxt}>OR</Text>
      <Buttons loading={false} text={"Get Current Loaction"} fUNC={fnnavigategps} />
      </View>



      </Pressable>
    
    </Modal>

    </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
    
  container: {
    ...Platform.select ({
      ios: {},
      android:{marginTop: StatusBar.currentHeight}
    }),
    flex: 1,
    backgroundColor: 'white',
  },


  Modalstyle:{
    backgroundColor:"green"

  },
 backofmodel: {
  flex: 1,
   backgroundColor:"rgba(0, 0, 0, 0.57)",
   justifyContent:"center",
   alignItems:"center"
  },

  Buttonshold:{
backgroundColor:"white",
//flex:1,
width:"95%",
borderRadius:6,
paddingTop:20,
paddingBottom:6,
paddingHorizontal:14,

marginHorizontal:10,


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
 ortxt:{
  color:"black",
  fontSize:14,
  fontFamily:"Inter-Bold",
  textAlign:"center",
  marginBottom:14
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
     //flex:1,
 },
  



 paymentmethodicon:{
  marginRight:10

  },
  paymentmethodiconcontainer:{
     flexDirection:"row",
     alignItems:"center",
   //  backgroundColor:"purple",
     flex:1,
  },
  paymentmethod:{
    // margin:5,

     borderColor:"#7F7F7F",
     marginHorizontal:10,
     flexDirection:"row",
     alignItems:"center",
     justifyContent:"space-between",
     paddingVertical:14,
     paddingHorizontal:10,
     borderWidth:0.5,
     borderRadius:6,
     marginBottom:14
  },

  paymentmethodtitle:{
     color:"black",
     fontSize:14,
     fontFamily:"Inter-Bold",
 },

 paymentmethodsubtitle:{
     color:"#7F7F7F",
     fontSize:12,
     fontFamily:"Inter-Regular",


    
 },

 titleandsubtitlehold:{

  flex:1
 }

}); 