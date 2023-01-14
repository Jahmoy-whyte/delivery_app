import { StyleSheet, View ,TouchableOpacity,Text,Image,ActivityIndicator} from 'react-native';
import { MaterialIcons} from '@expo/vector-icons';
import  {memo, useState, useMemo} from 'react';



const Cartcards = (
    {infostring , dishinfofn, deleteincart,deletestatus}) => {

    /*    let arrstr = nav_dname      0
        +"@" + quantityandprice[0]  1
        +"@" + quantityandprice[1]  2
        +"@"+ newtxt    3
      
        +"@"+ nav_dprice    4
        +"@"+ nav_ds    5
        +"@"+ nav_dtime  6
        +"@"+ nav_dimg  7
         
   */

        const [deleteload, setdeleteload] = useState("white")

        const showloading = useMemo(() =>{

          return deleteload

        },[deleteload])

            let newitem = []
            let resultarr = []
            newitem = infostring.split("@");
           


        
       let dname = newitem[0]
       let  dprice = newitem[4]
       let  dimg = newitem[7]
       let  ds =  newitem[5]
       let  dtime  = newitem[6]
       let   dquan  = newitem[1]
       let dcomment    = newitem[3]
       let dishid    = newitem[8]

   //    let  dishinfofn= ""
    //   let  dstatus= ""
      // let dincart= ""




       

        console.log("cart cards render")
          return(
          
              <View  style = {styles.barcontainer} >
        

          

              <TouchableOpacity disabled = {deletestatus} style = {styles. alltxtcontain} 
            //  onLongPress = {() => alert("press")}
             onPress ={()=> dishinfofn (2, dname, dprice, dimg ,ds,dtime,dquan,"false","true" ,dcomment, infostring,"nonav", dishid)  }  >
             
             <View style = {styles.edittouch}>
               <Text   ellipsizeMode ="tail" numberOfLines={2}  style = {styles.bartitle}>{dname}</Text>
              
               <View style = {styles.barpricecontainer}>
                  <Text style = {styles.barpricetxt}>Price: </Text>
                  <Text style = {styles.barsmalltxt}>${dprice}</Text>
               </View>
        
               <Text ellipsizeMode ="tail" numberOfLines={1}  style = {styles.bardiscription}>Quantity: {dquan}</Text>
              
              </View>



          <View  style={styles.imgcontain}>
                  <Image  style = {styles.barimage} 
                  source={{uri: dimg }} />
          
          
          <TouchableOpacity  style={styles.cartoptions} disabled = {deletestatus} 
          onPress={() =>{
            deleteincart(infostring)
            setdeleteload(dname)
          }} >

            {deleteload ===dname
            ?(<ActivityIndicator   size="small" color="white" />
          
            ):<MaterialIcons  name="delete-forever" size={18} color="white" />}
         
        
         
         
          </TouchableOpacity> 


          </View>
           </TouchableOpacity>
        
      

             
              </View>
 
        
          )
        }
        



const styles = StyleSheet.create({

    imgicon:{


        position:"absolute",  
 
        
  
    },
  //items list ============
  imgcontain:{
 // backgroundColor:"red",
  justifyContent:"center",
alignItems:"center"


  },
  cartoptionscontain:{

    flexDirection:"row",
    justifyContent:"center"

  },
  cartoptions:{
  alignItems:"center",
  width:40,
  height:40,
  justifyContent:"center",
  backgroundColor:"red",
  borderRadius:20,
  position:"absolute",
  bottom:0
  },
  editicon:{

    position:"absolute",
  //  alignSelf:"center"
  },

alltxtcontain:{
  //  backgroundColor:"red",
 
    flex:1,
    flexDirection:"row",
    alignItems:"center"
    },

    edittouch:{
        flex:1,

    },
    
    bartitle:{
    fontFamily:"Inter-Bold",
    fontSize:14,

    },
    
    barpricecontainer:{
        flexDirection:"row",
      
        
    },
   
    
    barpricetxt:{
        fontFamily:"Inter-Regular",
        fontSize:12,
        marginTop:1
    },
    barsmalltxt:{
        fontFamily:"Inter-Regular",
        fontSize:12,
        marginTop:1,
       // color:"green"
        
    },
    bardiscription:{
        fontFamily:"Inter-Regular",
        fontSize:12,
        color:"#7F7F7F",
        marginTop:1,    },
    

    //bar image ============== 
    barcontainer:{
      marginHorizontal:10,
     //backgroundColor:"yellow",
     
    paddingVertical:14,
    borderBottomColor:"gray",
    borderBottomWidth: 0.5
    },
    


    barimage:{
    height:86,
    width:94,
    borderRadius:6,
    },
    
    

    
  });


  export default memo(Cartcards)