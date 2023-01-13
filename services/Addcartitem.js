import  {useContext,useState} from "react";
import { Userinfo_Context ,Cartinfo_Context } from '../GlobalContext/Context';

import {db} from "../Firebaseconfig";
import { 
doc, 
updateDoc,
arrayUnion,
} from "firebase/firestore"; 
import Alertmessage from "../helpers/Alertmessage";





export const useAddtocart= (nav_comment) => {
    
const [buttonenable,setbuttonenable] =useState(false)
const [cartinfo , setcartinfo] = useContext(Cartinfo_Context)
const [userinfo , setuserinfo] = useContext(Userinfo_Context)
const [txtval , settxtval] = useState(nav_comment === "empty" ? "" :nav_comment)

    const FUNC_addtocart = async(
        nav_dname, 
        quantity,
        price,
        txt,
         nav_dprice, 
         nav_ds, 
         nav_dtime ,
         nav_dimg,
         nav_closebottomsheet,
         nav_dishid
    )=>{
        setbuttonenable(true)
        let arrstr = nav_dname 
        +"@" + quantity
        +"@" + price
        +"@"+ returntxt(txt)
        +"@"+ nav_dprice
        +"@"+ nav_ds
        +"@"+ nav_dtime
        +"@"+ nav_dimg
        +"@"+ nav_dishid
     try {
        const updatecart = doc(db, "Users", userinfo.userid);
        await updateDoc(updatecart, {
            Cartitems: arrayUnion(arrstr)
        });

        setcartinfo( prevState => ([...prevState, arrstr]))
        setbuttonenable(false)
        nav_closebottomsheet()
      } catch(error){
        Alertmessage("Error trying to Add item","custom_error")
        setbuttonenable(false)
      }
     }




    const FUNC_updatecart = async(
        nav_dname, 
        quantity,
        price,
        txt,
         nav_dprice, 
         nav_ds, 
         nav_dtime ,
         nav_dimg,
         nav_closebottomsheet,
         itemtodelete,
         nav_dishid
    )=>{

        
        setbuttonenable(true)

        let arrstr = nav_dname 
        +"@" + quantity
        +"@" + price
        +"@"+ returntxt(txt)
        +"@"+ nav_dprice
        +"@"+ nav_ds
        +"@"+ nav_dtime
        +"@"+ nav_dimg
        +"@"+ nav_dishid
     
        let newarr =  [...cartinfo]
        newarr.filter((word,index) =>{
        if (word == itemtodelete) {
       //   alert("found")
          newarr.splice(index,1)
        }
        });

        newarr.push(arrstr)

     try {
        const updatecart = doc(db, "Users", userinfo.userid);
        await updateDoc(updatecart, {
            Cartitems: newarr
        });

        setcartinfo(newarr)
        setbuttonenable(false)
        nav_closebottomsheet()
      } catch(error){
            Alertmessage("Error trying to Update item","custom_error")
           setbuttonenable(false)
      }
      }




      
    
     








      const returntxt = (txt) =>{

        let newtxt
        if(txt == "") {
          newtxt = "empty"
        }else{
          newtxt = txt
        }
      
        for (let char of newtxt) {
          char == "@" ? newtxt = newtxt.replace("@"," ") : ""
        }
       return newtxt
      }

      


 return[txtval, settxtval,buttonenable,FUNC_addtocart,FUNC_updatecart]
 }