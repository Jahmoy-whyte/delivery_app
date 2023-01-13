
import {useState, useCallback ,useRef} from 'react';
import Alertmessage from './Alertmessage';

  

const useBottomsheet_helper = () => {
   
    const bottomSheetRef = useRef()
    const [isopen, setisopen] = useState(-1);
    const [passarr, setpassarr] = useState([]);
    const snapPoints =['50%','70%','90%'];
  
    const openbottomsheet = useCallback(
    (index, dname, dprice, dimg ,ds,dtime,
      quantitynum ,dincart, dstatus ,dcomment, 
      action,dish_navigation,did
      )=>{
       
      
       if (dincart == true){ 
     dish_navigation.navigate('Cart')
      return
      }
       else if(dstatus == "False"){return Alertmessage("Sold Out", "custom_notify") }
       setpassarr([dname, dprice, dimg ,ds,dtime,quantitynum ,dcomment, action,did])
       bottomSheetRef.current?.snapToIndex(index) 
    },[])
   

   
    const closebottomsheet = (index) => {
    bottomSheetRef.current?.close(index)
    }

   

      return[openbottomsheet,
        closebottomsheet,
        isopen,
        passarr,
        bottomSheetRef,
        snapPoints,
        setisopen]
   
}
   
export default  useBottomsheet_helper
 
