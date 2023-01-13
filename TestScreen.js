import React, { useState,useEffect ,useCallback ,useRef,useMemo} from "react";
import {Button, Alert, Modal, StyleSheet, BackHandler, Text, Pressable, View } from "react-native";
import BottomSheet,{BottomSheetView , BottomSheetScrollView} from '@gorhom/bottom-sheet';

import { GestureHandlerRootView  } from 'react-native-gesture-handler';






const TestScreen = (navigation) => {

  const sheetRef = useRef();
  const snapPoints = ["50%","80%"]
  const [isShowing, setIsShowing] = useState();

useEffect(() =>{
  //openbottomsheet()
  console.log("hefffffffi")
      const onBackPress = () => {
        if (isShowing > -1) {
          sheetRef.current?.close();
          return true;
        } else if (isShowing == -1) {
          alert("hi")
          return true;
        }
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
},[isShowing])




const openbottomsheet = (index) => {
 // alert("wdwd")
 setIsShowing(true)
  sheetRef.current?.snapToIndex(index)
    
  }



  return (



     
    <GestureHandlerRootView  style={{ flex: 1 }}>
      
  <View style = {styles.centeredView}>
  

  <Button title = "hi" onPress= {() => openbottomsheet(0)} />
  <BottomSheet
    ref={sheetRef}
    snapPoints={snapPoints}
    enablePanDownToClose={true}
    onChange={(index) => {
      alert(index)
      setIsShowing(index)
      }}
      index={0}
    >
      <BottomSheetView>
        <Text>Awesome </Text>
      </BottomSheetView>
   </BottomSheet>


   </View>
</GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  backgroundColor:"red",
    marginTop: 22,
  
  },

  test:{
    marginTop:50,
    backgroundColor:"red",
    
  },


  modalView: {
    margin: 20,
   
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default TestScreen;



function Addreseeescreen({navigation}) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setaddress] = useState(null);
  useEffect(() => {

    (async () => {
    
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let address = await Location.reverseGeocodeAsync(
        {
          longitude: location.coords.longitude,
          latitude:location.coords.latitude
        }
      )


      setaddress(address)
      setLocation(location);
    })();

  }, []);

  let text = 'Waiting..';

  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(address);

    console.log(address)
  }

  return (
    <View style = {styles.ts}>
      <Text onPress={()=>navigation.goBack()} >{text}</Text>

    </View>
  );
}

