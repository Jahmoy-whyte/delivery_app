import React, { useState, useEffect } from 'react';
import { Platform, Text, View,TextInput, StyleSheet
  , ScrollView ,AppState 
  , TouchableOpacity,Modal,ActivityIndicator ,StatusBar, Pressable, SafeAreaView} from 'react-native';
import Buttons from '../components/Buttons';
import { StatusBar as Expostatusbar } from 'expo-status-bar';
import Header from '../components/Header';
import { useFonts  } from 'expo-font';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Alertmessage from '../helpers/Alertmessage';

export default function AddressInfoscreen({route,navigation}) {
 
  let { getlocationbool} = route.params;


  const [processing, setprocessing] = useState(false);

  const [location, setLocation] = useState(null);
  const [address, setaddress] = useState(null);
  const [tagname, settagname] = useState(null);

  const [statusmsg, setstatusmsg] = useState({
    status:null,
    loading:true,
  });
  const [boxtxt, setboxtxt] = useState({
    addressname:"",
    parish:""
  
  });
  
  useEffect(() => {
    if (getlocationbool === false){
      setstatusmsg(prev =>({
        loading: false,
        status:true,
      }));
      return
    }
    fn_permission()
  }, []);


  const fn_permission = async() => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {

      setstatusmsg(prev =>({
          ...prev ,
          status:false,
        }));

      return;
    }

    setstatusmsg(prev =>({
      ...prev ,
      status:true,
    }));

    try {
    let location = await Location.getCurrentPositionAsync({});
    let address = await Location.reverseGeocodeAsync(
      {
        longitude: location.coords.longitude,
        latitude:location.coords.latitude
      }
    )

   setboxtxt({
      addressname:address[0].country,
      parish: address[0].district +" " 
      + address[0].streetNumber +" " 
      + address[0].street,
    });

    setaddress(address)
    setLocation(location);

    setstatusmsg(prev =>({
      loading:false ,
      status:true,
    }));
  }catch (error){
    setstatusmsg(prev =>({
      loading:true ,
      status:"error",
    }));
    Alertmessage("Error occurred while getting location please try again","custom_error")
  }
  };

 

  let [fontsLoaded] =   useFonts ({
    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
    });
    



if (statusmsg.loading === true) {

  let msg1 = ""
  if (statusmsg.status === false){
    msg1 = "Please Enable Permission To Access Location"
  }else if (statusmsg.status === true){
    msg1 = "Getting Location"
  }else{
    msg1 = "Error occurred while getting location"
  }

  return(
    <SafeAreaView style = {styles.container}>
    <Header title={"Address Info"} nav={navigation}/>

    <View style = {styles.txtcontainer}>
    
    
      <Text style = {styles.permissiontxt} >{msg1}</Text>

      {statusmsg.status === true?(
      <View>
      <Text style = {styles.permissionsubtxt}>
        Tip: be close to a window or outsite to help us get your location,
        </Text>
      <ActivityIndicator size="large" color="black" />
      </View>
      ):
      <TouchableOpacity style = {styles.trybutton}
      onPress={()=>fn_permission()}
      >
      <Text style = {styles.trytxt} >Try Again</Text>
      </TouchableOpacity>
      }
     
   
    </View>
 

    </SafeAreaView>
  )

}
    


const Tagbuttons = ({txt})=>{

  return(

    <TouchableOpacity  
style ={
  tagname === txt
  ?styles.tagstxtbtnselected
  :styles.tagstxtbtn
}
onPress = {() => settagname(txt)}
>
<Text  
style ={ 
  tagname === txt
  ? styles.tagstxtselected
  : styles.tagstxt
}>
  {txt}
</Text>
</TouchableOpacity>
  )
}


const storeData = async () => {


  if (tagname === null){
    Alertmessage("Select A Tag","custom_error")
    return
  }
  setprocessing(true)

  try {
    let data =  boxtxt.addressname +"$"+ boxtxt.parish +"$"+ tagname 
    const addressdata = await AsyncStorage.getItem('@address_storage_Key')
   
    if (addressdata === null){
      await AsyncStorage.setItem('@address_storage_Key', data)
      Alertmessage("Saved","custom_success")
      setprocessing(false)
      navigation.goBack()
      return
    }

  if( ifexist(addressdata, data) === true) {
    Alertmessage("address exist","custom_notify")
    setprocessing(false)
    return
  }

    let newdata = addressdata +"@"+ data
    await AsyncStorage.setItem('@address_storage_Key', newdata)
    Alertmessage("Added","custom_success")
    setprocessing(false)
    navigation.goBack()
 
  } catch (e) {
    // saving error
    setprocessing(false)
    console.log(e)
    Alertmessage("error","custom_error")
  }
}


const ifexist = (addressdata,data)=>{

let returnbool = false;
  if (addressdata.includes("@") === true){
    let words = addressdata.split('@');
     words.filter((txt)=>{
      if (txt === data){
        returnbool = true;
      }
    })
  }else{
    addressdata === data
    ?  returnbool = true
    :  returnbool = false
  }
  return returnbool
}


  
const removeValue = async () => {
  try {
    await AsyncStorage.removeItem('@address_storage_Key')
  } catch(e) {
   alert("error")
  }

  console.log('Done.')
}
  


  return (
    <SafeAreaView style = {styles.container}>
    <Header title={"Address Info"} disable ={processing} nav={navigation}/>

<ScrollView style = {{flex:1, backgroundColor:"white"}}>
<View style ={styles.fortxtboxhold}>
        <Text style ={styles.textboxtxt} >Country:</Text>
        <TextInput 
  
          editable = {processing == true?false:true} 
        style ={styles.textbox} 
        onChangeText={(value) =>  {setboxtxt({ ...boxtxt ,  addressname:value})}}
          value = {boxtxt.addressname}
        />
    </View>

    
<View style ={styles.fortxtboxhold}>
        <Text style ={styles.textboxtxt} >Address:</Text>
        <TextInput 
  
          editable = {processing == true?false:true} 
        style ={styles.textbox} 
        onChangeText={(value) =>  {setboxtxt({ ...boxtxt ,  parish:value})}}
        value = {boxtxt.parish}
        />
    </View>

<Text  style ={styles.taghead} >Tags</Text>

<View  style ={styles.tagshold}>


<Tagbuttons txt={"Home"}/>
<Tagbuttons txt={"Work"}/>
<Tagbuttons txt={"Others"}/>


</View>

<Buttons loading={processing}  text={"Save"} fUNC = {()=> storeData()}/>
</ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
//storeData
//removeValue
  trybutton:{
    marginVertical:5,
    backgroundColor:"#F47A00",
        padding:10,
        borderRadius:6,
        alignItems:"center",
        marginBottom:14,
  },

  trytxt:{
    fontFamily:"Inter-Regular",
    fontSize:12,
    color:"white"
  },
  taghead:{

    fontFamily:"Inter-Bold",
    fontSize:16,
    marginHorizontal:10,
    marginVertical:14,
  },


  tagshold:{

flexDirection:"row",
justifyContent:"space-evenly",
alignItems:"center",
marginBottom:14,
  },

  tagstxtbtnselected:{
    borderRadius:6,
    borderWidth:0.5,
    borderColor:"#7F7F7F",
    backgroundColor:"#F47A00",

  },

  tagstxtselected:{
    fontFamily:"Inter-Regular",
    fontSize:12,
    paddingVertical:5,
    paddingHorizontal:20,
    color:"white"
  },




  tagstxt:{
    fontFamily:"Inter-Regular",
    fontSize:12,
    paddingVertical:5,
    paddingHorizontal:20,
  },

  tagstxtbtn:{
    borderRadius:6,
    borderWidth:0.5,
    borderColor:"#7F7F7F",

  },
  txtcontainer:{
    justifyContent:"center",
    alignItems:"center",
    flex:1,
  },
  permissiontxt:{
    color:"black" ,
    fontSize:14,
      fontFamily:"Inter-Bold",
     textAlign:"center"
  },

  permissionsubtxt:{
    color:"black" ,
    fontSize:12,
      fontFamily:"Inter-Regular",
     textAlign:"center"
  },

  container: {
    ...Platform.select ({
      ios: {},
      android:{marginTop: StatusBar.currentHeight}
    }),
    flex: 1,
    backgroundColor: 'white',
  },

  textboxtxt:{

    color:"black" ,
    fontSize:14,
      fontFamily:"Inter-Regular",
      marginBottom:5,
      

  },
  fortxtboxhold:{
      marginTop:14,
  marginHorizontal:10
  },

  textbox:{
    color:"black",
     // width:131,
      borderRadius:6,
      borderColor:"#7F7F7F",
         borderWidth:0.5,
     // height:35,
      padding:5,
      fontSize:14
  },

}); 