import { StyleSheet, View ,ActivityIndicator} from 'react-native';



const Loadingscreen = () => {
   
    return(
<View   style ={styles.menuitemcontainer} >
<ActivityIndicator size="large" color="black" />
</View>
    )

}



const styles = StyleSheet.create({

     // menuitemcontainer ===================================
     menuitemcontainer:{
      backgroundColor:"white",
      flex:1,
      justifyContent:"center",
      alignItems:"center"
      },
  
  

    
  });


  export default Loadingscreen;