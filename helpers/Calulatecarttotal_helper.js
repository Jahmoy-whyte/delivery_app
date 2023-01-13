
import { useContext, useMemo} from 'react';
import { Cartinfo_Context } from '../GlobalContext/Context';


const useCalulatecarttotal_helper = () =>{
  const [cartinfo , setcartinfo] = useContext(Cartinfo_Context)


  const calulate = useMemo(()=>{
    if (cartinfo.length > 0 ){
      console.log("Menu calulateing ------")
      let items;
      let itemsprice = 0
      cartinfo.forEach((iteminarr) =>{
        items=  iteminarr.split("@");
        itemsprice += parseInt(items[2])
      })
      return itemsprice
      }else{
        return 0 
      }
    },[cartinfo])


    return[calulate]
}

export default useCalulatecarttotal_helper