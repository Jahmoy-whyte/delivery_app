import React , {useContext,useState ,useEffect,useMemo, useCallback} from "react";
import {getAuth,onAuthStateChanged} from "firebase/auth";

import { Userinfo_Context ,Cartinfo_Context, Userstate_Context } from '../GlobalContext/Context';

import {db} from "../Firebaseconfig";
import { 
collection, 
query, 
where,
doc, 
setDoc , 
getDoc ,
getDocs ,
orderBy,
startAfter,
startAt,
limit,
updateDoc,
arrayUnion,
arrayRemove,
} from "firebase/firestore"; 
import Alertmessage from "../helpers/Alertmessage";





export const useaddfavorite= () => {
    
const [loading,setloading] =useState(false)
const [userinfo , setuserinfo] = useContext(Userinfo_Context)

    const FUNC_addtofavorite = async(dishid)=>{
     // alert(dishid)

      if (FUNC_isadded(dishid) === true) {
      //  alert("incart")
        removefavorite(dishid)
        return
      }

        let favoritedata = [...userinfo.favorite,dishid]
        setloading(true) 
     try {
        const updatecart = doc(db, "Users", userinfo.userid);
        await updateDoc(updatecart, {
            Favorite: favoritedata
        });
        setuserinfo( prevState => ({...prevState, favorite:favoritedata}))
        setloading(false)

      } catch(error){
        Alertmessage("Error trying to Add ","custom_error")
        setloading(false)
      }
    }



    const FUNC_isadded = (id) =>{
      //console.log("wdwdwd ==========")
     let arr = userinfo.favorite
     let bool = false
      arr.forEach(element => {
      if (element === id){
        bool  = true
      }
     });

     return bool
    }


    const removefavorite = async(dishid) =>{

      let favoritedata = userinfo.favorite



      favoritedata.forEach((element,index) => {
        if (element === dishid){
          favoritedata.splice(index,1)
          return
        }
      });



     setloading(true)
      try {
        const updatecart = doc(db, "Users", userinfo.userid);
        await updateDoc(updatecart, {
            Favorite: favoritedata
        });
        setuserinfo( prevState => ({...prevState, favorite:favoritedata}))
        setloading(false)

      } catch(error){
        Alertmessage("Error trying to remove favorite","custom_error")
        setloading(false)
      }
    }

 return[loading,FUNC_addtofavorite,FUNC_isadded]
 }